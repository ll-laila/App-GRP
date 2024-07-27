package org.sir.appgestionstock.ws.providers.inventaire.livraison;
import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.sir.appgestionstock.service.facade.inventaire.livraison.LivraisonService;
import org.sir.appgestionstock.ws.converter.inventaire.livraison.LivraisonConverter;
import org.sir.appgestionstock.ws.dto.inventaire.boncommande.BonCommandeDto;
import org.sir.appgestionstock.ws.dto.inventaire.livraison.LivraisonDto;
import org.sir.appgestionstock.ws.dto.ventes.facture.FactureDto;
import org.sir.appgestionstock.zutils.code.CodeGenerator;
import org.sir.appgestionstock.zutils.code.CodeResponse;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import java.util.List;
@RestController
@RequestMapping("/api/livraison")
public class LivraisonProvider {
@Autowired private LivraisonService service;
@Autowired private LivraisonConverter converter;
@GetMapping("/id/{id}")
public ResponseEntity<LivraisonDto> findById(@PathVariable Long id) {
var result = service.findById(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}

    @GetMapping("/livraisonErp/{idEntreprise}")
    public ResponseEntity<List<LivraisonDto>> getFactures(@PathVariable Long idEntreprise) {
        var result = service.getLivraisons(idEntreprise);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

@GetMapping
public ResponseEntity<List<LivraisonDto>> findAll() {
var result = service.findAll();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/optimized")
public ResponseEntity<List<LivraisonDto>> findAllOptimized() {
var result = service.findAllOptimized();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/paginated")
public ResponseEntity<Pagination<LivraisonDto>> findPaginated(
@RequestParam(name = "page", defaultValue = "0", required = false) int page,
@RequestParam(name = "size", defaultValue = "10", required = false) int size
) {
var result = service.findPaginated(page, size);
var pagination = result.convert(converter::toDto);
return ResponseEntity.ok(pagination);
}
@PostMapping
public ResponseEntity<LivraisonDto> save(@RequestBody LivraisonDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PostMapping("/all")
public ResponseEntity<List<LivraisonDto>> save(@RequestBody List<LivraisonDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping()
public ResponseEntity<LivraisonDto> update(@RequestBody LivraisonDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping("/all")
public ResponseEntity<List<LivraisonDto>> update(@RequestBody List<LivraisonDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping
public ResponseEntity<LivraisonDto> delete(@RequestBody LivraisonDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
service.delete(item);
return ResponseEntity.ok(dto);
}
@DeleteMapping("/all")
public ResponseEntity<List<LivraisonDto>> delete(@RequestBody List<LivraisonDto> dtos) {
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
@DeleteMapping("/taxeexpedition/id/{id}")
public ResponseEntity<Long> deleteByTaxeExpeditionId(@PathVariable Long id){
service.deleteByTaxeExpeditionId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/taxeexpedition/id/{id}")
public ResponseEntity<List<LivraisonDto>> findByTaxeExpeditionId(@PathVariable Long id){
var result = service.findByTaxeExpeditionId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/fournisseur/id/{id}")
public ResponseEntity<Long> deleteByFournisseurId(@PathVariable Long id){
service.deleteByFournisseurId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/fournisseur/id/{id}")
public ResponseEntity<List<LivraisonDto>> findByFournisseurId(@PathVariable Long id){
var result = service.findByFournisseurId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/entreprise/id/{id}")
public ResponseEntity<Long> deleteByEntrepriseId(@PathVariable Long id){
service.deleteByEntrepriseId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/entreprise/id/{id}")
public ResponseEntity<List<LivraisonDto>> findByEntrepriseId(@PathVariable Long id){
var result = service.findByEntrepriseId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
    @GetMapping("/next-code")
    public ResponseEntity<CodeResponse> getNextCode() {
        var generated = CodeGenerator.generate("L", service.findMaxId());
        return ResponseEntity.ok(generated);
    }
}