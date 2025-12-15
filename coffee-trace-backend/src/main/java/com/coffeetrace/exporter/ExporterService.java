package com.coffeetrace.exporter;

import com.coffeetrace.lot.LotRepository;
import com.coffeetrace.qr.QrCode;
import com.coffeetrace.qr.QrCodeRepository;
import com.coffeetrace.supplychain.*;
import com.coffeetrace.users.Actor;
import com.coffeetrace.users.ActorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExporterService {

    private final GreenLotRepository greenRepo;
    private final ExportLotRepository exportRepo;
    private final ShipmentRepository shipRepo;
    private final ActorRepository actorRepo;
    private final QrCodeRepository qrRepo;

    @Value("${app.publicBaseUrl:http://localhost:8080}")
    private String publicBaseUrl;

    public ExportLot createExportLot(CreateExportLotRequest req, UUID exporterActorId) {
        GreenLot green = greenRepo.findById(req.getGreenLotId())
                .orElseThrow(() -> new RuntimeException("Green lot not found"));
        Actor exporter = actorRepo.findById(exporterActorId)
                .orElseThrow(() -> new RuntimeException("Exporter actor not found"));

        ExportLot lot = ExportLot.builder()
                .greenLot(green)
                .exporter(exporter)
                .exportCode(req.getExportCode())
                .bagCount(req.getBagCount())
                .bagWeightKg(req.getBagWeightKg())
                .ecxCode(req.getEcxCode())
                .exportLicense(req.getExportLicense())
                .packingDate(LocalDate.now())
                .build();
        return exportRepo.save(lot);
    }

    public Shipment createShipment(CreateShipmentRequest req) {
        ExportLot lot = (ExportLot) exportRepo.findById(UUID.fromString(req.getExportLotId()))
                .orElseThrow(() -> new RuntimeException("Export lot not found"));

        Shipment shipment = Shipment.builder()
                .exportLot(lot)
                .exporter(lot.getExporter())
                .containerNo(req.getContainerNo())
                .billOfLading(req.getBillOfLading())
                .vesselName(req.getVesselName())
                .destinationCountry(req.getDestinationCountry())
                .departureDate(LocalDate.parse(req.getDepartureDate()))
                .arrivalEstimate(req.getArrivalEstimate() != null && !req.getArrivalEstimate().isBlank()
                        ? LocalDate.parse(req.getArrivalEstimate())
                        : null)
                .build();
        return shipRepo.save(shipment);
    }

//    public String generateQrForExportLot(String exportLotId) {
//        ExportLot lot = exportRepo.findById(exportLotId)
//                .orElseThrow(() -> new RuntimeException("Export lot not found"));
//public String generateQrForExportLot(UUID exportLotId) {
//    ExportLot lot = exportRepo.findById(exportLotId)
//            .orElseThrow(() -> new RuntimeException("Export lot not found"));
//
//        return qrRepo.findAll().stream()
//                .filter(q -> q.getExportLot().getId().equals(exportLotId))
//                .findFirst()
//                .map(q -> buildPublicUrl(q.getUrlToken()))
//                .orElseGet(() -> {
//                    String token = "QR-" + lot.getExportCode();
//                    QrCode qr = QrCode.builder()
//                            .exportLot(lot)
//                            .urlToken(token)
//                            .createdAt(LocalDateTime.now())
//                            .build();
//                    qrRepo.save(qr);
//                    return buildPublicUrl(token);
//                });
//    }

    public String generateQrForExportLot(UUID exportLotId) {

        // Load export lot
        ExportLot lot = exportRepo.findById(exportLotId)
                .orElseThrow(() -> new RuntimeException("Export lot not found"));

        return qrRepo.findAll().stream()
                .filter(q -> q.getExportLot().getId().equals(exportLotId))
                .findFirst()
                .map(q -> buildPublicUrl(q.getUrlToken()))
                .orElseGet(() -> {

                    String token = "QR-" + lot.getExportCode();

                    QrCode qr = QrCode.builder()
                            .exportLot(lot)
                            .urlToken(token)
                            .createdAt(LocalDateTime.now())
                            .build();

                    qrRepo.save(qr);

                    return buildPublicUrl(token);
                });
    }


    private String buildPublicUrl(String token) {
        return publicBaseUrl + "/api/public/qr/" + token;
    }
}
