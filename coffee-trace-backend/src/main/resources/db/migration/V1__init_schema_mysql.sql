CREATE TABLE app_user (
    id              UUID PRIMARY KEY,
    username        VARCHAR(100) UNIQUE NOT NULL,
    password_hash   VARCHAR(255)       NOT NULL,
    email           VARCHAR(150),
    phone           VARCHAR(50),
    role            VARCHAR(50)        NOT NULL, -- ADMIN, FARMER, FIELD_OFFICER, COOP, EXPORTER, ROASTER, REGULATOR
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE actor (
    id              UUID PRIMARY KEY,
    user_id         UUID REFERENCES app_user(id),
    type            VARCHAR(50) NOT NULL, -- FARMER, COOP, EXPORTER, ROASTER, REGULATOR, NGO
    name            VARCHAR(200) NOT NULL,
    legal_name      VARCHAR(255),
    country         VARCHAR(100) DEFAULT 'Ethiopia',
    region          VARCHAR(100), -- e.g. Oromia, SNNPR
    zone            VARCHAR(100),
    woreda          VARCHAR(100),
    kebele          VARCHAR(100),
    address_text    TEXT,
    phone           VARCHAR(50),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Enable PostGIS extension once per DB
-- CREATE EXTENSION postgis;

CREATE TABLE farm (
    id              UUID PRIMARY KEY,
    farmer_id UUID NOT NULL REFERENCES actor(id),
    name            VARCHAR(200),
    area_ha         NUMERIC(10,2),
    elevation_m     NUMERIC(10,2),
    region          VARCHAR(100),
    zone            VARCHAR(100),
    woreda          VARCHAR(100),
    kebele          VARCHAR(100),
    village         VARCHAR(100),
    geom            GEOMETRY(POLYGON, 4326),      -- GPS polygon
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE plot (
    id              UUID PRIMARY KEY,
    farm_id         UUID NOT NULL REFERENCES farm(id),
    name            VARCHAR(100),
    variety         VARCHAR(100),                 -- e.g. Heirloom, 74110, 74158
    planting_year   INT,
    tree_count      INT,
    area_ha         NUMERIC(10,2),
    shade_trees     BOOLEAN,
    intercropping   BOOLEAN,
    notes           TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE survey (
    id              UUID PRIMARY KEY,
    farm_id         UUID NOT NULL REFERENCES farm(id),
    survey_type     VARCHAR(50), -- BASELINE, EUDR, SOCIAL, GAP
    answers_json    JSONB NOT NULL,
    score           NUMERIC(5,2),
    risk_level      VARCHAR(20), -- LOW, MEDIUM, HIGH
    conducted_by    UUID REFERENCES actor(id), -- often FIELD_OFFICER
    conducted_at    TIMESTAMP NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE harvest (
    id              UUID PRIMARY KEY,
    plot_id         UUID NOT NULL REFERENCES plot(id),
    farmer_actor_id UUID NOT NULL REFERENCES actor(id),
    harvest_date    DATE NOT NULL,
    quantity_kg     NUMERIC(10,2) NOT NULL, -- cherry kg
    picking_round   INT, -- 1, 2, 3
    quality_notes   TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE lot (
    id              UUID PRIMARY KEY,
    owner_actor_id  UUID NOT NULL REFERENCES actor(id),
    code            VARCHAR(50) UNIQUE NOT NULL, -- e.g. LOT-ETH-2025-000123
    lot_type        VARCHAR(50) NOT NULL,  -- CHERRY, PARCHMENT, GREEN, ROASTED
    origin_level    VARCHAR(50),           -- FARM, COOP, REGION
    certifications  TEXT[],                -- {Organic, Fairtrade}
    status          VARCHAR(50) NOT NULL,  -- IN_STOCK, IN_PROCESS, SHIPPED, CLOSED
    current_location VARCHAR(255),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Link harvests to initial/cherry lots
CREATE TABLE harvest_lot_link (
    harvest_id      UUID REFERENCES harvest(id),
    lot_id          UUID REFERENCES lot(id),
    PRIMARY KEY (harvest_id, lot_id)
);

-- Generic processing step (e.g. cherry → parchment, parchment → green)
CREATE TABLE processing_step (
    id              UUID PRIMARY KEY,
    processor_actor_id UUID NOT NULL REFERENCES actor(id),
    step_type       VARCHAR(50) NOT NULL, -- DRYING, HULLING, SORTING, ROASTING
    date            DATE NOT NULL,
    yield_percentage NUMERIC(5,2),
    notes           TEXT
);

CREATE TABLE processing_input_lot (
    processing_step_id UUID REFERENCES processing_step(id),
    lot_id             UUID REFERENCES lot(id),
    PRIMARY KEY (processing_step_id, lot_id)
);

CREATE TABLE processing_output_lot (
    processing_step_id UUID REFERENCES processing_step(id),
    lot_id             UUID REFERENCES lot(id),
    PRIMARY KEY (processing_step_id, lot_id)
);

CREATE TABLE transaction (
    id              UUID PRIMARY KEY,
    from_actor_id   UUID REFERENCES actor(id),
    to_actor_id     UUID REFERENCES actor(id),
    date            DATE NOT NULL,
    total_price     NUMERIC(12,2),
    payment_method  VARCHAR(50), -- CASH, MOBILE_MONEY, BANK
    currency        VARCHAR(10) DEFAULT 'ETB',
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE transaction_lot (
    transaction_id  UUID REFERENCES transaction(id),
    lot_id          UUID REFERENCES lot(id),
    quantity_kg     NUMERIC(10,2) NOT NULL,
    PRIMARY KEY (transaction_id, lot_id)
);

CREATE TABLE shipment (
    id              UUID PRIMARY KEY,
    exporter_actor_id UUID NOT NULL REFERENCES actor(id),
    buyer_name      VARCHAR(255),
    destination_country VARCHAR(100),
    container_no    VARCHAR(100),
    departure_date  DATE,
    arrival_estimate DATE,
    docs_json       JSONB,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE shipment_lot (
    shipment_id     UUID REFERENCES shipment(id),
    lot_id          UUID REFERENCES lot(id),
    quantity_kg     NUMERIC(10,2),
    PRIMARY KEY (shipment_id, lot_id)
);

CREATE TABLE roast_batch (
    id              UUID PRIMARY KEY,
    roaster_actor_id UUID NOT NULL REFERENCES actor(id),
    code            VARCHAR(50) UNIQUE NOT NULL,
    roast_date      DATE NOT NULL,
    profile         VARCHAR(100), -- e.g. "Filter, light roast"
    notes           TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE roast_batch_lot (
    roast_batch_id  UUID REFERENCES roast_batch(id),
    lot_id          UUID REFERENCES lot(id),
    PRIMARY KEY (roast_batch_id, lot_id)
);

CREATE TABLE product (
    id              UUID PRIMARY KEY,
    sku             VARCHAR(50) UNIQUE NOT NULL,
    roaster_actor_id UUID NOT NULL REFERENCES actor(id),
    name            VARCHAR(255) NOT NULL,
    description     TEXT,
    roast_batch_id  UUID REFERENCES roast_batch(id),
    bag_weight_g    INT,
    public_story    TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE qr_code (
    id              UUID PRIMARY KEY,
    product_id      UUID NOT NULL REFERENCES product(id),
    batch_code      VARCHAR(50),
    url_token       VARCHAR(100) UNIQUE NOT NULL, -- used in public URL
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);
