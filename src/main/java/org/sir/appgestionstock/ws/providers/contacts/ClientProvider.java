package org.sir.appgestionstock.ws.providers.contacts;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.service.facade.contacts.ClientService;
import org.sir.appgestionstock.ws.converter.contacts.ClientConverter;
import org.sir.appgestionstock.ws.dto.contacts.ClientDto;
import org.sir.appgestionstock.zutils.code.CodeGenerator;
import org.sir.appgestionstock.zutils.code.CodeResponse;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/client")
public class ClientProvider {
@Autowired private ClientService service;
@Autowired private ClientConverter converter;
@GetMapping("/id/{id}")
public ResponseEntity<ClientDto> findById(@PathVariable Long id) {
var result = service.findById(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping
public ResponseEntity<List<ClientDto>> findAll() {
var result = service.findAll();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}

    @GetMapping("/clients/{idEntreprise}")
    public ResponseEntity<Double> getNbClients(@PathVariable Long idEntreprise) {
        double result = service.getNbClients(idEntreprise);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/clientsErp/{idEntreprise}")
    public ResponseEntity<List<ClientDto>> getClients(@PathVariable Long idEntreprise) {
        var result = service.getClients(idEntreprise);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }


    @GetMapping("/client-stats/{idEntreprise}")
    public Map<String, Map<String, Long>> getClientStatsForCurrentWeek(@PathVariable Long idEntreprise) {
        return service.getClientStatsForCurrentWeek(idEntreprise);
    }


@GetMapping("/optimized")
public ResponseEntity<List<ClientDto>> findAllOptimized() {
var result = service.findAllOptimized();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/paginated")
public ResponseEntity<Pagination<ClientDto>> findPaginated(
@RequestParam(name = "page", defaultValue = "0", required = false) int page,
@RequestParam(name = "size", defaultValue = "10", required = false) int size
) {
var result = service.findPaginated(page, size);
var pagination = result.convert(converter::toDto);
return ResponseEntity.ok(pagination);
}
@PostMapping
public ResponseEntity<ClientDto> save(@RequestBody ClientDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PostMapping("/all")
public ResponseEntity<List<ClientDto>> save(@RequestBody List<ClientDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping()
public ResponseEntity<ClientDto> update(@RequestBody ClientDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping("/all")
public ResponseEntity<List<ClientDto>> update(@RequestBody List<ClientDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping
public ResponseEntity<ClientDto> delete(@RequestBody ClientDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
service.delete(item);
return ResponseEntity.ok(dto);
}
@DeleteMapping("/all")
public ResponseEntity<List<ClientDto>> delete(@RequestBody List<ClientDto> dtos) {
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
public ResponseEntity<ClientDto> findByAdresseId(@PathVariable Long id){
var result = service.findByAdresseId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/devises/id/{id}")
public ResponseEntity<Long> deleteByDevisesId(@PathVariable Long id){
service.deleteByDevisesId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/devises/id/{id}")
public ResponseEntity<List<ClientDto>> findByDevisesId(@PathVariable Long id){
var result = service.findByDevisesId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/niveauprix/id/{id}")
public ResponseEntity<Long> deleteByNiveauPrixId(@PathVariable Long id){
service.deleteByNiveauPrixId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/niveauprix/id/{id}")
public ResponseEntity<List<ClientDto>> findByNiveauPrixId(@PathVariable Long id){
var result = service.findByNiveauPrixId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/taxe/id/{id}")
public ResponseEntity<Long> deleteByTaxeId(@PathVariable Long id){
service.deleteByTaxeId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/taxe/id/{id}")
public ResponseEntity<List<ClientDto>> findByTaxeId(@PathVariable Long id){
var result = service.findByTaxeId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/entreprise/id/{id}")
public ResponseEntity<Long> deleteByEntrepriseId(@PathVariable Long id){
service.deleteByEntrepriseId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/entreprise/id/{id}")
public ResponseEntity<List<ClientDto>> findByEntrepriseId(@PathVariable Long id){
var result = service.findByEntrepriseId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
    @GetMapping("/next-code")
    public ResponseEntity<CodeResponse> getNextCode() {
        var generated = CodeGenerator.generate("C", service.findMaxId());
        return ResponseEntity.ok(generated);
    }
}