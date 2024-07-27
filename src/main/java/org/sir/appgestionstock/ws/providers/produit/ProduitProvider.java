package org.sir.appgestionstock.ws.providers.produit;


import org.sir.appgestionstock.service.facade.produit.ProduitService;
import org.sir.appgestionstock.ws.converter.produit.ProduitConverter;
import org.sir.appgestionstock.ws.dto.produit.ProduitDto;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/produit")
//@PreAuthorize("hasRole('ADMIN')")
//@PreAuthorize("hasRole('EMPLOYE')")
public class ProduitProvider {
    @Autowired
    private ProduitService service;
    @Autowired
    private ProduitConverter converter;

    @GetMapping("/id/{id}")
    public ResponseEntity<ProduitDto> findById(@PathVariable Long id) {
        var result = service.findById(id);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @GetMapping("/produitsErp/{idEntreprise}")
    public ResponseEntity<List<ProduitDto>> getClients(@PathVariable Long idEntreprise) {
        var result = service.getProduits(idEntreprise);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }


    @GetMapping
    public ResponseEntity<List<ProduitDto>> findAll() {
        var result = service.findAll();
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @GetMapping("/produits/{idEntreprise}")
    public ResponseEntity<Double> getNBrProduits(@PathVariable Long idEntreprise) {
        double result = service.getNbProduits(idEntreprise);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/optimized")
    public ResponseEntity<List<ProduitDto>> findAllOptimized() {
        var result = service.findAllOptimized();
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }


    @GetMapping("/paginated")
   // @PreAuthorize("hasAuthority('produit:read')")
    public ResponseEntity<Pagination<ProduitDto>> findPaginated(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size
    ) {
        var result = service.findPaginated(page, size);
        var pagination = result.convert(converter::toDto);
        return ResponseEntity.ok(pagination);
    }


    @PostMapping
    //@PreAuthorize("hasAuthority('produit:read')")
    public ResponseEntity<ProduitDto> save(@RequestBody ProduitDto dto) {
            if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
            var item = converter.toItem(dto);
            var result = service.create(item);
            var resultDto = converter.toDto(result);
            return ResponseEntity.ok(resultDto);
    }


    @PostMapping("/all")
   // @PreAuthorize("hasRole('ADMIN') and hasAuthority('produit:create')")
    public ResponseEntity<List<ProduitDto>> save(@RequestBody List<ProduitDto> dtos) {
        if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
        var item = converter.toItem(dtos);
        var result = service.create(item);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @PutMapping()
    public ResponseEntity<ProduitDto> update(@RequestBody ProduitDto dto) {
        if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
        var item = converter.toItem(dto);
        var result = service.update(item);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @PutMapping("/all")
    public ResponseEntity<List<ProduitDto>> update(@RequestBody List<ProduitDto> dtos) {
        if (dtos == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
        var item = converter.toItem(dtos);
        var result = service.update(item);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @DeleteMapping
    public ResponseEntity<ProduitDto> delete(@RequestBody ProduitDto dto) {
        if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
        var item = converter.toItem(dto);
        service.delete(item);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/all")
    public ResponseEntity<List<ProduitDto>> delete(@RequestBody List<ProduitDto> dtos) {
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

    @DeleteMapping("/niveaustock/id/{id}")
    public ResponseEntity<Long> deleteByNiveauStockId(@PathVariable Long id) {
        service.deleteByNiveauStockId(id);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/niveaustock/id/{id}")
    public ResponseEntity<ProduitDto> findByNiveauStockId(@PathVariable Long id) {
        var result = service.findByNiveauStockId(id);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @DeleteMapping("/devises/id/{id}")
    public ResponseEntity<Long> deleteByDevisesId(@PathVariable Long id) {
        service.deleteByDevisesId(id);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/devises/id/{id}")
    public ResponseEntity<List<ProduitDto>> findByDevisesId(@PathVariable Long id) {
        var result = service.findByDevisesId(id);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @DeleteMapping("/taxe/id/{id}")
    public ResponseEntity<Long> deleteByTaxeId(@PathVariable Long id) {
        service.deleteByTaxeId(id);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/taxe/id/{id}")
    public ResponseEntity<List<ProduitDto>> findByTaxeId(@PathVariable Long id) {
        var result = service.findByTaxeId(id);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @DeleteMapping("/fournisseur/id/{id}")
    public ResponseEntity<Long> deleteByFournisseurId(@PathVariable Long id) {
        service.deleteByFournisseurId(id);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/fournisseur/id/{id}")
    public ResponseEntity<List<ProduitDto>> findByFournisseurId(@PathVariable Long id) {
        var result = service.findByFournisseurId(id);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }

    @DeleteMapping("/entreprise/id/{id}")
    public ResponseEntity<Long> deleteByEntrepriseId(@PathVariable Long id) {
        service.deleteByEntrepriseId(id);
        return ResponseEntity.ok(id);
    }

    @GetMapping("/entreprise/id/{id}")
    public ResponseEntity<List<ProduitDto>> findByEntrepriseId(@PathVariable Long id) {
        var result = service.findByEntrepriseId(id);
        var resultDto = converter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }
}