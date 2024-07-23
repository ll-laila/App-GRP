package org.sir.appgestionstock.service.impl.contacts;

import org.sir.appgestionstock.bean.core.ClientProduitNiveauPrix;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.bean.core.produit.ProduitNiveauPrix;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.sir.appgestionstock.dao.contacts.ClientDao;
import org.sir.appgestionstock.service.facade.ClientProduitNiveauPrixService;
import org.sir.appgestionstock.service.facade.contacts.ClientService;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.service.facade.adresse.AdresseService;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.service.facade.parametres.DevisesService;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.service.facade.parametres.NiveauPrixService;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.service.facade.parametres.TaxeService;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.zutils.service.ServiceHelper;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.sir.appgestionstock.exception.NotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

@Service
public class ClientServiceImpl implements ClientService {
    //--------------- FIND -------------------------------------
    public Client findById(Long id) {
        return dao.findById(id).orElse(null);
    }

    public List<Client> findAll() {
        return dao.findAll();
    }

    public List<Client> findAllOptimized() {
        return dao.findAllOptimized();
    }

    @Override
    public Pagination<Client> findPaginated(int page, int size) {
        var pageable = PageRequest.of(page, size);
        var found = dao.findAll(pageable);
        var items = found.stream().toList();
        return new Pagination<>(
                items,
                found.getNumber(),
                found.getSize(),
                found.getTotalElements(),
                found.getTotalPages(),
                found.isFirst(),
                found.isLast()
        );
    }



    //--------------- CREATE -----------------------------------
    @Transactional(rollbackFor = Exception.class)
    public Client create(Client item) {
        if (item == null) return null;
// check if devises exists
        var devises = item.getDevises();
        if (devises != null) {
            if (devises.getId() == null) item.setDevises(null);
            else {
                var found = devisesService.findById(devises.getId());
                if (found == null) throw new NotFoundException("Unknown Given Devises");
                item.setDevises(found);
            }
        }
// check if niveauPrix exists
        var niveauPrix = item.getNiveauPrix();
        if (niveauPrix != null) {
            if (niveauPrix.getId() == null) item.setNiveauPrix(null);
            else {
                var found = niveauPrixService.findById(niveauPrix.getId());
                if (found == null) throw new NotFoundException("Unknown Given NiveauPrix");
                item.setNiveauPrix(found);
            }
        }
// check if taxe exists
        var taxe = item.getTaxe();
        if (taxe != null) {
            if (taxe.getId() == null) item.setTaxe(null);
            else {
                var found = taxeService.findById(taxe.getId());
                if (found == null) throw new NotFoundException("Unknown Given Taxe");
                item.setTaxe(found);
            }
        }
// check if entreprise exists
        var entreprise = item.getEntreprise();
        if (entreprise != null) {
            if (entreprise.getId() == null) item.setEntreprise(null);
            else {
                var found = entrepriseService.findById(entreprise.getId());
                if (found == null) throw new NotFoundException("Unknown Given Entreprise");
                item.setEntreprise(found);
            }
        }
        createAssociatedObject(item);
        item.setCreationDate(LocalDate.now());
        var saved = dao.save(item);
        ServiceHelper.createList(saved, Client::getClientProduitNiveauPrix, ClientProduitNiveauPrix::setClient,clientProduitNiveauPrixService::create);
        return saved;
    }

    @Transactional(rollbackFor = Exception.class)
    public List<Client> create(List<Client> items) {
        List<Client> result = new ArrayList<>();
        if (items == null || items.isEmpty()) return result;
        items.forEach(it -> result.add(create(it)));
        return result;
    }

    //--------------- UPDATE -----------------------------------
    @Transactional(rollbackFor = Exception.class)
    public Client update(Client item) {
        if (item == null || item.getId() == null) return null;
        var oldItem = findById(item.getId());
        if (oldItem == null) throw new NotFoundException("Unknown Client To Be Updated!");
// update adresse
        var adresse = item.getAdresse();
        var oldAdresse = oldItem.getAdresse();
        if (oldAdresse == null) {
            if (adresse != null) adresseService.create(adresse);
        } else {
// if (adresse == null) adresseService.delete(oldAdresse);
            if (adresse != null) {
                adresse.setId(oldAdresse.getId());
                adresseService.update(adresse);
            }

        }
        return dao.save(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public List<Client> update(List<Client> items) {
        List<Client> result = new ArrayList<>();
        if (items == null || items.isEmpty()) return result;
        items.forEach(it -> result.add(update(it)));
        return result;
    }

    //--------------- DELETE -----------------------------------
    @Transactional(rollbackFor = Exception.class)
    public void deleteById(Long id) {
        Client item = findById(id);
        if (item != null) delete(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(Client item) {
        dao.delete(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(List<Client> items) {
        if (items == null || items.isEmpty()) return;
        items.forEach(this::delete);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteByIdIn(List<Long> ids) {
        dao.deleteByIdIn(ids);
    }

    //--------------- FIND AND DELETE BYs ----------------------
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByAdresseId(Long id) {
        return dao.deleteByAdresseId(id);
    }

    @Override
    public Client findByAdresseId(Long id) {
        return dao.findByAdresseId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByDevisesId(Long id) {
        if (id == null) return 0;
        return dao.deleteByDevisesId(id);
    }

    @Override
    public List<Client> findByDevisesId(Long id) {
        return dao.findByDevisesId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByNiveauPrixId(Long id) {
        if (id == null) return 0;
        return dao.deleteByNiveauPrixId(id);
    }

    @Override
    public List<Client> findByNiveauPrixId(Long id) {
        return dao.findByNiveauPrixId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByTaxeId(Long id) {
        if (id == null) return 0;
        return dao.deleteByTaxeId(id);
    }

    @Override
    public List<Client> findByTaxeId(Long id) {
        return dao.findByTaxeId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByEntrepriseId(Long id) {
        if (id == null) return 0;
        return dao.deleteByEntrepriseId(id);
    }

    @Override
    public List<Client> findByEntrepriseId(Long id) {
        return dao.findByEntrepriseId(id);
    }

    //----------------------------------------------------------
    public void createAssociatedObject(Client item) {
        if (item == null) return;
        ServiceHelper.createObject(item, Client::getAdresse, adresseService::create);
    }

    public Long findMaxId() {
        return dao.findMaxId();
    }


    @Override
    public double getNbClients(Long idEntreprise){
        List<Client> clients = dao.findByEntrepriseId(idEntreprise);
        return clients.size();
    }

    @Override
    public List<Client> getClients(Long idEntreprise){
        return dao.findByEntrepriseId(idEntreprise);
    }

    @Override
    public Map<String, Map<String, Long>> getClientStatsForCurrentWeek(Long idEntreprise) {
        Map<String, Map<String, Long>> clientStats = new HashMap<>();

        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        List<Client> clients = dao.findAllByEntrepriseIdAndCreationDateBetween(idEntreprise, startOfWeek, endOfWeek);

        for (LocalDate date = startOfWeek; !date.isAfter(endOfWeek); date = date.plusDays(1)) {
            final LocalDate currentDate = date; // Déclarer currentDate comme finale

            String day = currentDate.getDayOfWeek().toString();

            // Count new clients created on the current day
            long newClientsCount = clients.stream()
                    .filter(client -> client.getCreationDate().isEqual(currentDate))
                    .count();

            // Count recurring clients created before the current day
            long recurringClientsCount = clients.stream()
                    .filter(client -> client.getCreationDate().isBefore(currentDate))
                    .count();

            recurringClientsCount = recurringClientsCount + newClientsCount;

            Map<String, Long> dailyStats = new HashMap<>();
            dailyStats.put("newClients", newClientsCount);
            dailyStats.put("recurringClients", recurringClientsCount);

            clientStats.put(day, dailyStats);
        }

        return clientStats;
    }


    //----------------------------------------------------------
    @Autowired
    private ClientDao dao;
    @Lazy
    @Autowired
    private AdresseService adresseService;
    @Lazy
    @Autowired
    private DevisesService devisesService;
    @Lazy
    @Autowired
    private NiveauPrixService niveauPrixService;
    @Lazy
    @Autowired
    private TaxeService taxeService;
    @Lazy
    @Autowired
    private EntrepriseService entrepriseService;

    @Lazy
    @Autowired
    private ClientProduitNiveauPrixService clientProduitNiveauPrixService;
}
