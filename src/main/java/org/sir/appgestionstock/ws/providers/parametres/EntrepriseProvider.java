package org.sir.appgestionstock.ws.providers.parametres;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/api/entreprise")
public class EntrepriseProvider {
@Autowired private EntrepriseService service;
@Autowired private EntrepriseConverter converter;
@GetMapping("/id/{id}")
public ResponseEntity<EntrepriseDto> findById(@PathVariable Long id) {
var result = service.findById(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping
public ResponseEntity<List<EntrepriseDto>> findAll() {
var result = service.findAll();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}

    @GetMapping("/Admin/Entreprises/{username}")
    public ResponseEntity<List<EntrepriseDto>> findAllByAdmin(@PathVariable String username) {
        var result = service.findEntrepriseByAdmin(username);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @GetMapping("/employe/{id}")
    public ResponseEntity<List<EntrepriseDto>> findEntrepriseDroitAcces(@PathVariable Long id) {
        var result = service.findEntrepriseDroitAcces(id);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

@GetMapping("/optimized")
public ResponseEntity<List<EntrepriseDto>> findAllOptimized() {
var result = service.findAllOptimized();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/paginated")
public ResponseEntity<Pagination<EntrepriseDto>> findPaginated(
@RequestParam(name = "page", defaultValue = "0", required = false) int page,
@RequestParam(name = "size", defaultValue = "10", required = false) int size
) {
var result = service.findPaginated(page, size);
var pagination = result.convert(converter::toDto);
return ResponseEntity.ok(pagination);
}
@PostMapping
public ResponseEntity<EntrepriseDto> save(@RequestParam("item") String itemJson, @RequestParam("file") MultipartFile file) throws IOException {
EntrepriseDto erp = new ObjectMapper().readValue(itemJson, EntrepriseDto.class);
erp.setLogo(file.getBytes());
if (erp == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(erp);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PostMapping("/all")
public ResponseEntity<List<EntrepriseDto>> save(@RequestBody List<EntrepriseDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}

@PutMapping()
public ResponseEntity<EntrepriseDto> update(@RequestBody EntrepriseDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}

@PutMapping("/all")
public ResponseEntity<List<EntrepriseDto>> update(@RequestBody List<EntrepriseDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping
public ResponseEntity<EntrepriseDto> delete(@RequestBody EntrepriseDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
service.delete(item);
return ResponseEntity.ok(dto);
}
@DeleteMapping("/all")
public ResponseEntity<List<EntrepriseDto>> delete(@RequestBody List<EntrepriseDto> dtos) {
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
@DeleteMapping("/adresse/id/{id}")
public ResponseEntity<Long> deleteByAdresseId(@PathVariable Long id){
service.deleteByAdresseId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/adresse/id/{id}")
public ResponseEntity<EntrepriseDto> findByAdresseId(@PathVariable Long id){
var result = service.findByAdresseId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}

}