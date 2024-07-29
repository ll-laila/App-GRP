package org.sir.appgestionstock.ws.providers.ventes.devis;
import org.sir.appgestionstock.bean.core.ventes.devis.Devis;
import org.sir.appgestionstock.service.facade.ventes.devis.DevisService;
import org.sir.appgestionstock.ws.converter.ventes.devis.DevisConverter;
import org.sir.appgestionstock.ws.dto.ventes.PaiementDto;
import org.sir.appgestionstock.ws.dto.ventes.devis.DevisDto;
import org.sir.appgestionstock.zutils.code.CodeGenerator;
import org.sir.appgestionstock.zutils.code.CodeResponse;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import java.util.List;
@RestController
@RequestMapping("/api/devis")
public class DevisProvider {
@Autowired private DevisService service;
@Autowired private DevisConverter converter;
@GetMapping("/id/{id}")
public ResponseEntity<DevisDto> findById(@PathVariable Long id) {
var result = service.findById(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}


    @GetMapping("/devisErp/{idEntreprise}")
    public ResponseEntity<List<DevisDto>> getPaiements(@PathVariable Long idEntreprise) {
        var result = service.getDevis(idEntreprise);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

@GetMapping
public ResponseEntity<List<DevisDto>> findAll() {
var result = service.findAll();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/optimized")
public ResponseEntity<List<DevisDto>> findAllOptimized() {
var result = service.findAllOptimized();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/paginated")
public ResponseEntity<Pagination<DevisDto>> findPaginated(
@RequestParam(name = "page", defaultValue = "0", required = false) int page,
@RequestParam(name = "size", defaultValue = "10", required = false) int size
) {
var result = service.findPaginated(page, size);
var pagination = result.convert(converter::toDto);
return ResponseEntity.ok(pagination);
}
@PostMapping
public ResponseEntity<DevisDto> save(@RequestBody DevisDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PostMapping("/all")
public ResponseEntity<List<DevisDto>> save(@RequestBody List<DevisDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping()
public ResponseEntity<DevisDto> update(@RequestBody DevisDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping("/all")
public ResponseEntity<List<DevisDto>> update(@RequestBody List<DevisDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping
public ResponseEntity<DevisDto> delete(@RequestBody DevisDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
service.delete(item);
return ResponseEntity.ok(dto);
}
@DeleteMapping("/all")
public ResponseEntity<List<DevisDto>> delete(@RequestBody List<DevisDto> dtos) {
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
@DeleteMapping("/paiement/id/{id}")
public ResponseEntity<Long> deleteByPaiementId(@PathVariable Long id){
service.deleteByPaiementId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/paiement/id/{id}")
public ResponseEntity<DevisDto> findByPaiementId(@PathVariable Long id){
var result = service.findByPaiementId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/retourproduit/id/{id}")
public ResponseEntity<Long> deleteByRetourProduitId(@PathVariable Long id){
service.deleteByRetourProduitId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/retourproduit/id/{id}")
public ResponseEntity<DevisDto> findByRetourProduitId(@PathVariable Long id){
var result = service.findByRetourProduitId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/taxe/id/{id}")
public ResponseEntity<Long> deleteByTaxeId(@PathVariable Long id){
service.deleteByTaxeId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/taxe/id/{id}")
public ResponseEntity<List<DevisDto>> findByTaxeId(@PathVariable Long id){
var result = service.findByTaxeId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/taxeexpedition/id/{id}")
public ResponseEntity<Long> deleteByTaxeExpeditionId(@PathVariable Long id){
service.deleteByTaxeExpeditionId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/taxeexpedition/id/{id}")
public ResponseEntity<List<DevisDto>> findByTaxeExpeditionId(@PathVariable Long id){
var result = service.findByTaxeExpeditionId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/client/id/{id}")
public ResponseEntity<Long> deleteByClientId(@PathVariable Long id){
service.deleteByClientId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/client/id/{id}")
public ResponseEntity<List<DevisDto>> findByClientId(@PathVariable Long id){
var result = service.findByClientId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/devises/id/{id}")
public ResponseEntity<Long> deleteByDevisesId(@PathVariable Long id){
service.deleteByDevisesId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/devises/id/{id}")
public ResponseEntity<List<DevisDto>> findByDevisesId(@PathVariable Long id){
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
public ResponseEntity<List<DevisDto>> findByNiveauPrixId(@PathVariable Long id){
var result = service.findByNiveauPrixId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/entreprise/id/{id}")
public ResponseEntity<Long> deleteByEntrepriseId(@PathVariable Long id){
service.deleteByEntrepriseId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/entreprise/id/{id}")
public ResponseEntity<List<DevisDto>> findByEntrepriseId(@PathVariable Long id){
var result = service.findByEntrepriseId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
    @GetMapping("/next-code")
    public ResponseEntity<CodeResponse> getNextCode() {
        var generated = CodeGenerator.generate("D", service.findMaxId());
        return ResponseEntity.ok(generated);
    }
}