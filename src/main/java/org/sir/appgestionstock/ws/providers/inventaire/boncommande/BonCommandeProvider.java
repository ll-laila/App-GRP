package org.sir.appgestionstock.ws.providers.inventaire.boncommande;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommande;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.service.facade.inventaire.boncommande.BonCommandeService;
import org.sir.appgestionstock.ws.converter.inventaire.boncommande.BonCommandeConverter;
import org.sir.appgestionstock.ws.converter.parametres.EntrepriseConverter;
import org.sir.appgestionstock.ws.dto.inventaire.NiveauStockDto;
import org.sir.appgestionstock.ws.dto.inventaire.boncommande.BonCommandeDto;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import org.sir.appgestionstock.zutils.code.CodeGenerator;
import org.sir.appgestionstock.zutils.code.CodeResponse;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import java.util.List;
@RestController
@RequestMapping("/api/boncommande")
public class BonCommandeProvider {
@Autowired private BonCommandeService service;
@Autowired private BonCommandeConverter converter;
@Autowired private EntrepriseConverter entrepriseConverter;

@GetMapping("/id/{id}")
public ResponseEntity<BonCommandeDto> findById(@PathVariable Long id) {
var result = service.findById(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}


    @GetMapping("/idFor/{idFor}")
    public ResponseEntity<List<BonCommandeDto>> findAllByFor(@PathVariable Long idFor) {
        var result = service.findAllByIdFor(idFor);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @GetMapping("/cout/{id}")
    public ResponseEntity<Double> getCout(@PathVariable Long id) {
        double result = service.getCout(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/bonCommandesErp/{idEntreprise}")
    public ResponseEntity<List<BonCommandeDto>> getBonCommandes(@PathVariable Long idEntreprise) {
        var result = service.getBonCommandes(idEntreprise);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @GetMapping("/achats/{idEntreprise}")
    public ResponseEntity<Double> getNBrAchats(@PathVariable Long idEntreprise) {
        double result = service.getNbrAchats(idEntreprise);
        return ResponseEntity.ok(result);
    }

@GetMapping
public ResponseEntity<List<BonCommandeDto>> findAll() {
var result = service.findAll();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/optimized")
public ResponseEntity<List<BonCommandeDto>> findAllOptimized() {
var result = service.findAllOptimized();
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@GetMapping("/paginated")
public ResponseEntity<Pagination<BonCommandeDto>> findPaginated(
@RequestParam(name = "page", defaultValue = "0", required = false) int page,
@RequestParam(name = "size", defaultValue = "10", required = false) int size
) {
var result = service.findPaginated(page, size);
var pagination = result.convert(converter::toDto);
return ResponseEntity.ok(pagination);
}



@PostMapping
public ResponseEntity<BonCommandeDto> save(@RequestBody BonCommandeDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PostMapping("/all")
public ResponseEntity<List<BonCommandeDto>> save(@RequestBody List<BonCommandeDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.create(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping()
public ResponseEntity<BonCommandeDto> update(@RequestBody BonCommandeDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@PutMapping("/all")
public ResponseEntity<List<BonCommandeDto>> update(@RequestBody List<BonCommandeDto> dtos) {
if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dtos);
var result = service.update(item);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping
public ResponseEntity<BonCommandeDto> delete(@RequestBody BonCommandeDto dto) {
if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
var item = converter.toItem(dto);
service.delete(item);
return ResponseEntity.ok(dto);
}
@DeleteMapping("/all")
public ResponseEntity<List<BonCommandeDto>> delete(@RequestBody List<BonCommandeDto> dtos) {
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
@DeleteMapping("/livraison/id/{id}")
public ResponseEntity<Long> deleteByLivraisonId(@PathVariable Long id){
service.deleteByLivraisonId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/livraison/id/{id}")
public ResponseEntity<BonCommandeDto> findByLivraisonId(@PathVariable Long id){
var result = service.findByLivraisonId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/taxe/id/{id}")
public ResponseEntity<Long> deleteByTaxeId(@PathVariable Long id){
service.deleteByTaxeId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/taxe/id/{id}")
public ResponseEntity<List<BonCommandeDto>> findByTaxeId(@PathVariable Long id){
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
public ResponseEntity<List<BonCommandeDto>> findByTaxeExpeditionId(@PathVariable Long id){
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
public ResponseEntity<List<BonCommandeDto>> findByFournisseurId(@PathVariable Long id){
var result = service.findByFournisseurId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
@DeleteMapping("/devises/id/{id}")
public ResponseEntity<Long> deleteByDevisesId(@PathVariable Long id){
service.deleteByDevisesId(id);
return ResponseEntity.ok(id);
}
@GetMapping("/devises/id/{id}")
public ResponseEntity<List<BonCommandeDto>> findByDevisesId(@PathVariable Long id){
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
public ResponseEntity<List<BonCommandeDto>> findByNiveauPrixId(@PathVariable Long id){
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
public ResponseEntity<List<BonCommandeDto>> findByEntrepriseId(@PathVariable Long id){
var result = service.findByEntrepriseId(id);
var resultDto = converter.toDto(result);
return ResponseEntity.ok(resultDto);
}
    @GetMapping("/next-code")
    public ResponseEntity<CodeResponse> getNextCode() {
        var generated = CodeGenerator.generate("B", service.findMaxId());
        return ResponseEntity.ok(generated);
    }

    @PutMapping("/idC/{idC}/idL/{idL}")
    public ResponseEntity<?> bonCmdLivraispn(@PathVariable Long idC , @PathVariable Long idL){
        service.bonCmdLivraispn(idC, idL);
        return ResponseEntity.ok().build();
    }
}