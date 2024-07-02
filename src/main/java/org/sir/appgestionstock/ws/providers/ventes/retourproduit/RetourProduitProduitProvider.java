package org.sir.appgestionstock.ws.providers.ventes.retourproduit;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduitProduit;
import org.sir.appgestionstock.service.facade.ventes.retourproduit.RetourProduitProduitService;
import org.sir.appgestionstock.ws.converter.ventes.retourproduit.RetourProduitProduitConverter;
import org.sir.appgestionstock.ws.dto.ventes.retourproduit.RetourProduitProduitDto;
import org.sir.appgestionstock.zutils.code.CodeGenerator;
import org.sir.appgestionstock.zutils.code.CodeResponse;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import java.util.List;
@RestController
@RequestMapping("/api/retourproduitproduit")
public class RetourProduitProduitProvider {
@Autowired private RetourProduitProduitService service;
@Autowired private RetourProduitProduitConverter converter;
@GetMapping("/id/{id}")
public ResponseEntity<RetourProduitProduitDto> findById(@PathVariable Long id) {
var result = service.findById(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping
public ResponseEntity<List<RetourProduitProduitDto>> findAll() {
var result = service.findAll();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/optimized")
public ResponseEntity<List<RetourProduitProduitDto>> findAllOptimized() {
var result = service.findAllOptimized();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/paginated")
public ResponseEntity<Pagination<RetourProduitProduitDto>> findPaginated(
@RequestParam(name = "page", defaultValue = "0", required = false) int page,
@RequestParam(name = "size", defaultValue = "10", required = false) int size
) {
var result = service.findPaginated(page, size);
var pagination = result.convert(converter::toDto);
return ResponseEntity.ok(pagination);
}
@PostMapping
public ResponseEntity<RetourProduitProduitDto> save(@RequestBody RetourProduitProduitDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PostMapping("/all")
public ResponseEntity<List<RetourProduitProduitDto>> save(@RequestBody List<RetourProduitProduitDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping()
public ResponseEntity<RetourProduitProduitDto> update(@RequestBody RetourProduitProduitDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping("/all")
public ResponseEntity<List<RetourProduitProduitDto>> update(@RequestBody List<RetourProduitProduitDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping
public ResponseEntity<RetourProduitProduitDto> delete(@RequestBody RetourProduitProduitDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
service.delete(item);
return ResponseEntity.ok(dto);
}
@DeleteMapping("/all")
public ResponseEntity<List<RetourProduitProduitDto>> delete(@RequestBody List<RetourProduitProduitDto> dtos) {
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
public ResponseEntity<List<RetourProduitProduitDto>> findByProduitId(@PathVariable Long id){
var result = service.findByProduitId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/retourproduit/id/{id}")
public ResponseEntity<Long> deleteByRetourProduitId(@PathVariable Long id){
service.deleteByRetourProduitId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/retourproduit/id/{id}")
public ResponseEntity<List<RetourProduitProduitDto>> findByRetourProduitId(@PathVariable Long id){
var result = service.findByRetourProduitId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
    @GetMapping("/next-code")
    public ResponseEntity<CodeResponse> getNextCode() {
        var generated = CodeGenerator.generate("R", service.findMaxId());
        return ResponseEntity.ok(generated);
    }
}