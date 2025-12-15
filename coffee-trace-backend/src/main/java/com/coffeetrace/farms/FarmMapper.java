package com.coffeetrace.farms;


import com.coffeetrace.trace.FarmView;

public class FarmMapper {

    public static FarmView toView(Farm farm) {
        if (farm == null) return null;

        return FarmView.builder()
                .farmId(farm.getId())
                .farmerId(
                        farm.getFarmer() != null ? farm.getFarmer().getId() : null
                )
                .farmerName(
                        farm.getFarmer() != null ? farm.getFarmer().getName() : null
                )
                .variety(farm.getVariety())
                .elevationM(farm.getElevationM())
                .areaHa(farm.getAreaHa())
                .region(farm.getRegion())
                .zone(farm.getZone())
                .woreda(farm.getWoreda())
                .kebele(farm.getKebele())
                .geomGeoJson(null)   // If you add geo JSON later
                .photoUrl(null)      // If Actor has a photo URL
                .build();
    }
}

