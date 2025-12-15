package com.coffeetrace.supplychain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplyChainService {

    private final GreenLotRepository greenRepo;
    private final ExportLotRepository exportRepo;

    public List<GreenLot> listGreenLots() { return greenRepo.findAll(); }

    public List<ExportLot> listExportLots() { return exportRepo.findAll(); }
}
