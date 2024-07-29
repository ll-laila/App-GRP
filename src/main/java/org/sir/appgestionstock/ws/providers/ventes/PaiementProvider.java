package org.sir.appgestionstock.ws.providers.ventes;
import org.sir.appgestionstock.bean.core.ventes.Paiement;
import org.sir.appgestionstock.service.facade.ventes.PaiementService;
import org.sir.appgestionstock.ws.converter.ventes.PaiementConverter;
import org.sir.appgestionstock.ws.dto.ventes.PaiementDto;
import org.sir.appgestionstock.ws.dto.ventes.facture.FactureDto;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import java.util.List;
@RestController
@RequestMapping("/api/paiement")
public class PaiementProvider {
@Autowired private PaiementService service;
@Autowired private PaiementConverter converter;
@GetMapping("/id/{id}")
public ResponseEntity<PaiementDto> findById(@PathVariable Long id) {
var result = service.findById(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}

    @GetMapping("/idFacture/{id}")
    public ResponseEntity<PaiementDto> findByIdFacture(@PathVariable Long id) {
        var result = service.findByIdFacture(id);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

@GetMapping
public ResponseEntity<List<PaiementDto>> findAll() {
var result = service.findAll();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}


    @GetMapping("/income/{id}")
    public ResponseEntity<Double> getIncome(@PathVariable Long id) {
        double result = service.getIncome(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/paiementsErp/{idEntreprise}")
    public ResponseEntity<List<PaiementDto>> getPaiements(@PathVariable Long idEntreprise) {
        var result = service.getPaiements(idEntreprise);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

@GetMapping("/optimized")
public ResponseEntity<List<PaiementDto>> findAllOptimized() {
var result = service.findAllOptimized();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/paginated")
public ResponseEntity<Pagination<PaiementDto>> findPaginated(
@RequestParam(name = "page", defaultValue = "0", required = false) int page,
@RequestParam(name = "size", defaultValue = "10", required = false) int size
) {
var result = service.findPaginated(page, size);
var pagination = result.convert(converter::toDto);
return ResponseEntity.ok(pagination);
}
@PostMapping
public ResponseEntity<PaiementDto> save(@RequestBody PaiementDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PostMapping("/all")
public ResponseEntity<List<PaiementDto>> save(@RequestBody List<PaiementDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping()
public ResponseEntity<PaiementDto> update(@RequestBody PaiementDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping("/all")
public ResponseEntity<List<PaiementDto>> update(@RequestBody List<PaiementDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping
public ResponseEntity<PaiementDto> delete(@RequestBody PaiementDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
service.delete(item);
return ResponseEntity.ok(dto);
}
@DeleteMapping("/all")
public ResponseEntity<List<PaiementDto>> delete(@RequestBody List<PaiementDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
service.delete(item);
return ResponseEntity.ok(dtos);
}
@DeleteMapping("/id/{id}")
public ResponseEntity<Long> deleteById(@PathVariable Long id) {
service.deleteById(id);
return ResponseEntity.ok(id);
}
@DeleteMapping("/ids")
public ResponseEntity<List<Long>> deleteByIdIn(@RequestParam("id") List<Long> ids) {
service.deleteByIdIn(ids);
return ResponseEntity.ok(ids);
}
@DeleteMapping("/methodepaiement/id/{id}")
public ResponseEntity<Long> deleteByMethodePaiementId(@PathVariable Long id){
service.deleteByMethodePaiementId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/methodepaiement/id/{id}")
public ResponseEntity<List<PaiementDto>> findByMethodePaiementId(@PathVariable Long id){
var result = service.findByMethodePaiementId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/entreprise/id/{id}")
public ResponseEntity<Long> deleteByEntrepriseId(@PathVariable Long id){
service.deleteByEntrepriseId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/entreprise/id/{id}")
public ResponseEntity<List<PaiementDto>> findByEntrepriseId(@PathVariable Long id){
var result = service.findByEntrepriseId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
}
