package org.sir.appgestionstock.ws.providers.inventaire.boncommande;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommandeProduit;
import org.sir.appgestionstock.service.facade.inventaire.boncommande.BonCommandeProduitService;
import org.sir.appgestionstock.ws.converter.inventaire.boncommande.BonCommandeProduitConverter;
import org.sir.appgestionstock.ws.dto.inventaire.boncommande.BonCommandeProduitDto;
import org.sir.appgestionstock.zutils.code.CodeGenerator;
import org.sir.appgestionstock.zutils.code.CodeResponse;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import java.util.List;
@RestController
@RequestMapping("/api/boncommandeproduit")
public class BonCommandeProduitProvider {
@Autowired private BonCommandeProduitService service;
@Autowired private BonCommandeProduitConverter converter;
@GetMapping("/id/{id}")
public ResponseEntity<BonCommandeProduitDto> findById(@PathVariable Long id) {
var result = service.findById(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping
public ResponseEntity<List<BonCommandeProduitDto>> findAll() {
var result = service.findAll();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/optimized")
public ResponseEntity<List<BonCommandeProduitDto>> findAllOptimized() {
var result = service.findAllOptimized();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/paginated")
public ResponseEntity<Pagination<BonCommandeProduitDto>> findPaginated(
@RequestParam(name = "page", defaultValue = "0", required = false) int page,
@RequestParam(name = "size", defaultValue = "10", required = false) int size
) {
var result = service.findPaginated(page, size);
var pagination = result.convert(converter::toDto);
return ResponseEntity.ok(pagination);
}
@PostMapping
public ResponseEntity<BonCommandeProduitDto> save(@RequestBody BonCommandeProduitDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PostMapping("/all")
public ResponseEntity<List<BonCommandeProduitDto>> save(@RequestBody List<BonCommandeProduitDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping()
public ResponseEntity<BonCommandeProduitDto> update(@RequestBody BonCommandeProduitDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping("/all")
public ResponseEntity<List<BonCommandeProduitDto>> update(@RequestBody List<BonCommandeProduitDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping
public ResponseEntity<BonCommandeProduitDto> delete(@RequestBody BonCommandeProduitDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
service.delete(item);
return ResponseEntity.ok(dto);
}
@DeleteMapping("/all")
public ResponseEntity<List<BonCommandeProduitDto>> delete(@RequestBody List<BonCommandeProduitDto> dtos) {
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
@DeleteMapping("/produit/id/{id}")
public ResponseEntity<Long> deleteByProduitId(@PathVariable Long id){
service.deleteByProduitId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/produit/id/{id}")
public ResponseEntity<List<BonCommandeProduitDto>> findByProduitId(@PathVariable Long id){
var result = service.findByProduitId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/boncommande/id/{id}")
public ResponseEntity<Long> deleteByBonCommandeId(@PathVariable Long id){
service.deleteByBonCommandeId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/boncommande/id/{id}")
public ResponseEntity<List<BonCommandeProduitDto>> findByBonCommandeId(@PathVariable Long id){
var result = service.findByBonCommandeId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
    @GetMapping("/next-code")
    public ResponseEntity<CodeResponse> getNextCode() {
        var generated = CodeGenerator.generate("B", service.findMaxId());
        return ResponseEntity.ok(generated);
    }
}