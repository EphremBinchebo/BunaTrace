 package com.coffeetrace.farms;


 import com.coffeetrace.trace.FarmView;
 import lombok.RequiredArgsConstructor;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;

 import java.lang.reflect.Method;
 import java.util.List;
 import java.util.UUID;
// import java.util.UUID;

// @RestController
// @RequestMapping("/api/farms")
// @RequiredArgsConstructor
// public class FarmController {
//
//     private final FarmService farmService;
//
//     @GetMapping
//     public ResponseEntity<List<Farm>> getAllFarms() {
//         return ResponseEntity.ok(farmService.getAllFarms());
//     }
//
//     @GetMapping("/farmer/{farmerId}")
//     public ResponseEntity<List<Farm>> getFarmsByFarmer(@PathVariable("farmerId") String farmerId) {
//         return ResponseEntity.ok(farmService.getFarmsByFarmer(farmerId));
//     }
////     @GetMapping("/farmer/{farmerId}")
////     public ResponseEntity<List<Farm>> getByFarmer(@PathVariable String farmerId) {
////         return ResponseEntity.ok(farmService.getFarmsByFarmer(farmerId));
////     }
//
//     @GetMapping("/{farmId}")
//     public ResponseEntity<Farm> getFarmById(@PathVariable String farmId) {
//         Farm farm = farmService.getFarmById(farmId);
//         return (farm == null)
//                 ? ResponseEntity.notFound().build()
//                 : ResponseEntity.ok(farm);
//     }
//
//     @PostMapping
//     public ResponseEntity<Farm> createFarm(@RequestBody FarmRequest req) {
//         return ResponseEntity.ok(farmService.createFarm(req));
//     }
// }
//@RestController
//@RequestMapping("/api/farms")
//@RequiredArgsConstructor
//public class FarmController {
//
//    private final FarmService farmService;
//
//    @GetMapping
//    public ResponseEntity<List<Farm>> getAllFarms() {
//        return ResponseEntity.ok(farmService.getAllFarms());
//    }
//
//    @GetMapping("/farmer/{farmerId}")
//    public ResponseEntity<List<Farm>> getFarmsByFarmer(@PathVariable UUID farmerId) {
//        return ResponseEntity.ok(farmService.getFarmsByFarmer(farmerId));
//    }
//
//    @GetMapping("/{farmId}")
//    public ResponseEntity<Farm> getFarmById(@PathVariable UUID farmId) {
//        return ResponseEntity.ok(farmService.getFarmById(farmId));
//    }
//
//    @PostMapping
//    public ResponseEntity<Farm> createFarm(@RequestBody FarmRequest req) {
//        return ResponseEntity.ok(farmService.createFarm(req));
//    }
//}

@RestController
@RequestMapping("/api/farms")
@RequiredArgsConstructor
public class FarmController {

    private final FarmService farmService;

//    @GetMapping
//    public ResponseEntity<List<Farm>> getAllFarms() {
//        return ResponseEntity.ok(farmService.getAllFarms());
//    }
@GetMapping
public ResponseEntity<List<FarmView>> getAll() {
    return ResponseEntity.ok(
            farmService.getAllFarms().stream()
                    .map(FarmMapper::toView)
                    .toList()
    );
}
    @PostMapping
    public ResponseEntity<Farm> createFarm(@RequestBody FarmRequest req) {
        return ResponseEntity.ok(farmService.createFarm(req));
    }

    @GetMapping("/farmer/{farmerId}")
    public List<Farm> getFarmsByFarmer(@PathVariable("farmerId") UUID farmerId) {
        System.out.println("👉 FARMER ID = " + farmerId);
        return farmService.getFarmsByFarmer(farmerId);
    }



    @GetMapping("/{farmId}")
    public ResponseEntity<Farm> getFarmById(@PathVariable String farmId) {
        return ResponseEntity.ok(farmService.getFarmById(UUID.fromString(farmId)));
    }
}
