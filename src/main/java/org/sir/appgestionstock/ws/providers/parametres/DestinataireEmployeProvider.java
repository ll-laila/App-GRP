package org.sir.appgestionstock.ws.providers.parametres;
import org.sir.appgestionstock.bean.core.parametres.DestinataireEmploye;
import org.sir.appgestionstock.service.facade.parametres.DestinataireEmployeService;
import org.sir.appgestionstock.ws.converter.parametres.DestinataireEmployeConverter;
import org.sir.appgestionstock.ws.dto.parametres.DestinataireEmployeDto;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import java.util.List;
@RestController
@RequestMapping("/api/destinataireemploye")
public class DestinataireEmployeProvider {
@Autowired private DestinataireEmployeService service;
@Autowired private DestinataireEmployeConverter converter;
@GetMapping("/id/{id}")
public ResponseEntity<DestinataireEmployeDto> findById(@PathVariable Long id) {
var result = service.findById(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping
public ResponseEntity<List<DestinataireEmployeDto>> findAll() {
var result = service.findAll();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/optimized")
public ResponseEntity<List<DestinataireEmployeDto>> findAllOptimized() {
var result = service.findAllOptimized();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/paginated")
public ResponseEntity<Pagination<DestinataireEmployeDto>> findPaginated(
@RequestParam(name = "page", defaultValue = "0", required = false) int page,
@RequestParam(name = "size", defaultValue = "10", required = false) int size
) {
var result = service.findPaginated(page, size);
var pagination = result.convert(converter::toDto);
return ResponseEntity.ok(pagination);
}
@PostMapping
public ResponseEntity<DestinataireEmployeDto> save(@RequestBody DestinataireEmployeDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PostMapping("/all")
public ResponseEntity<List<DestinataireEmployeDto>> save(@RequestBody List<DestinataireEmployeDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping()
public ResponseEntity<DestinataireEmployeDto> update(@RequestBody DestinataireEmployeDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping("/all")
public ResponseEntity<List<DestinataireEmployeDto>> update(@RequestBody List<DestinataireEmployeDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping
public ResponseEntity<DestinataireEmployeDto> delete(@RequestBody DestinataireEmployeDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
service.delete(item);
return ResponseEntity.ok(dto);
}
@DeleteMapping("/all")
public ResponseEntity<List<DestinataireEmployeDto>> delete(@RequestBody List<DestinataireEmployeDto> dtos) {
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
@DeleteMapping("/employe/id/{id}")
public ResponseEntity<Long> deleteByEmployeId(@PathVariable Long id){
service.deleteByEmployeId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/employe/id/{id}")
public ResponseEntity<List<DestinataireEmployeDto>> findByEmployeId(@PathVariable Long id){
var result = service.findByEmployeId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/alerte/id/{id}")
public ResponseEntity<Long> deleteByAlerteId(@PathVariable Long id){
service.deleteByAlerteId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/alerte/id/{id}")
public ResponseEntity<List<DestinataireEmployeDto>> findByAlerteId(@PathVariable Long id){
var result = service.findByAlerteId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
}