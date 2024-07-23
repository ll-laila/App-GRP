package org.sir.appgestionstock.service.impl.contacts.user;

import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.bean.core.contacts.user.PermissionsAcces;
import org.sir.appgestionstock.bean.core.parametres.DestinataireEmploye;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.dao.contacts.user.EmployeDao;
import org.sir.appgestionstock.dao.contacts.user.PermissionsAccesDao;
import org.sir.appgestionstock.exception.NotFoundException;
import org.sir.appgestionstock.service.facade.adresse.AdresseService;
import org.sir.appgestionstock.service.facade.contacts.user.EmployeService;
import org.sir.appgestionstock.service.facade.contacts.user.PermissionsAccesService;
import org.sir.appgestionstock.service.facade.parametres.DestinataireEmployeService;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.zsecurity.permissions.RoleEnum;
import org.sir.appgestionstock.zsecurity.service.facade.AppUserService;
import org.sir.appgestionstock.zsecurity.service.facade.RoleService;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.sir.appgestionstock.zutils.service.ServiceHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeServiceImpl implements EmployeService {

    //--------------- FIND -------------------------------------

    @Override
    public Employe findByUsername(String username){
        return dao.findByUsername(username);
    }

    @Transactional
    public Employe getEmployeeByNotificationId(Long notificationId) {
        return dao.findByNotificationId(notificationId);
    }

    public Employe findById(Long id) {
        return dao.findById(id).orElse(null);
    }

    public List<Employe> findAll() {
        return dao.findAll();
    }

    public List<Employe> findAllOptimized() {
        return dao.findAllOptimized();
    }

    @Override
    public Pagination<Employe> findPaginated(int page, int size) {
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
    public Employe create(Employe item) {
        if (item == null) return null;

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

        List<Entreprise> entreprisesAcces = item.getEntreprisesAdroitAcces();
        item.setEntreprisesAdroitAcces(entreprisesAcces);

        createAssociatedObject(item);
        item.setRoles(List.of(RoleEnum.EMPLOYE.getRole()));

        item.setPhone(item.getTelephone());
        item.setUsername(item.getEmail());

        // Save PermissionsAcces, ensure it's not null
        List<PermissionsAcces> permissionsAccesList = item.getPermissionsAcces();
        if (permissionsAccesList != null) {
            permissionsAccesList = permissionsAccesDao.saveAll(permissionsAccesList);
            item.setPermissionsAcces(permissionsAccesList);
        }

        appUserService.save(item);
        Employe saved = dao.save(item);
        createAssociatedList(saved);

      /*  if (entreprisesAcces != null) {
            for (Entreprise e : entreprisesAcces) {
                if (e.getEmployesAdroitAcces() == null) {
                    e.setEmployesAdroitAcces(new ArrayList<>());
                }
                e.getEmployesAdroitAcces().add(saved);
                entrepriseService.update(e);
            }
        }


        if (  item.getEntreprise().getEmployesAdroitAcces() == null) {
               item.getEntreprise().setEmployesAdroitAcces(new ArrayList<>());
        }
        item.getEntreprise().getEmployesAdroitAcces().add(saved);
        entrepriseService.update(item.getEntreprise());
        */
        return saved;
    }



    @Transactional(rollbackFor = Exception.class)
    public List<Employe> create(List<Employe> items) {
        List<Employe> result = new ArrayList<>();
        if (items == null || items.isEmpty()) return result;
        items.forEach(it -> result.add(create(it)));
        return result;
    }

   //--------------- UPDATE -----------------------------------

    @Transactional(rollbackFor = Exception.class)
    public Employe update(Employe item) {
        if (item == null || item.getId() == null) return null;

        // Récupérer l'ancien employé
        var oldItem = findById(item.getId());
        if (oldItem == null) throw new NotFoundException("Unknown Employe To Be Updated!");

        // Mise à jour de l'adresse
        var adresse = item.getAdresse();
        var oldAdresse = oldItem.getAdresse();
        if (oldAdresse == null) {
            if (adresse != null) adresseService.create(adresse);
        } else {
            if (adresse == null) adresseService.delete(oldAdresse);
            else {
                adresse.setId(oldAdresse.getId());
                adresseService.update(adresse);
            }
        }

        // Mise à jour de l'entreprise
        var entreprise = item.getEntreprise();
        if (entreprise != null) {
            if (entreprise.getId() == null) item.setEntreprise(null);
            else {
                var found = entrepriseService.findById(entreprise.getId());
                if (found == null) throw new NotFoundException("Unknown Given Entreprise");
                item.setEntreprise(found);
            }
        }

        // Mise à jour des permissionsAcces
        List<PermissionsAcces> permissionsAccesList = item.getPermissionsAcces();
        if (permissionsAccesList != null) {
            permissionsAccesList = permissionsAccesDao.saveAll(permissionsAccesList);
            item.setPermissionsAcces(permissionsAccesList);
        }

        // Mise à jour de entreprisesAcces
//        List<Entreprise> entreprisesAcces = item.getEntreprisesAdroitAcces();
//        if (entreprisesAcces != null) {
//            item.setEntreprisesAdroitAcces(entreprisesAcces);
//            for (Entreprise e : entreprisesAcces) {
//                e.getEmployesAdroitAcces().add(item);
//            }
//        }

        // Enregistrer les modifications de l'employé
        Employe saved = dao.save(item);
        updateAssociatedList(saved);

        return saved;
    }


 //   @Transactional(rollbackFor = Exception.class)
//    public Employe update(Employe item) {
//        if (item == null || item.getId() == null) return null;
//        var oldItem = findById(item.getId());
//        if (oldItem == null) throw new NotFoundException("Unknown Employe To Be Updated!");
//// update adresse
//        var adresse = item.getAdresse();
//        var oldAdresse = oldItem.getAdresse();
//        if (oldAdresse == null) {
//            if (adresse != null) adresseService.create(adresse);
//        } else {
//// if (adresse == null) adresseService.delete(oldAdresse);
//            if (adresse != null) {
//                adresse.setId(oldAdresse.getId());
//                adresseService.update(adresse);
//            }
//        }
//        Employe saved = dao.save(item);
//        updateAssociatedList(saved);
//        return saved;
//    }

    @Transactional(rollbackFor = Exception.class)
    public List<Employe> update(List<Employe> items) {
        List<Employe> result = new ArrayList<>();
        if (items == null || items.isEmpty()) return result;
        items.forEach(it -> result.add(update(it)));
        return result;
    }


    @Transactional(rollbackFor = Exception.class)
    public void deleteById(Long id) {
        if (id == null) return;

        // Find the employee by id
        Optional<Employe> optionalEmploye = dao.findById(id);
        if (!optionalEmploye.isPresent()) throw new NotFoundException("Employee not found");

        Employe employe = optionalEmploye.get();

        // Remove the employee from entreprise's droit acces list
        List<Entreprise> entreprisesAcces = employe.getEntreprisesAdroitAcces();
        if (entreprisesAcces != null) {
            for (Entreprise entreprise : entreprisesAcces) {
                entreprise.getEmployesAdroitAcces().remove(employe);
            }
        }

        // Remove associated permissions
        List<PermissionsAcces> permissionsAccesList = employe.getPermissionsAcces();
        if (permissionsAccesList != null) {
            permissionsAccesDao.deleteAll(permissionsAccesList);
            employe.setPermissionsAcces(null);
        }

        // Delete the employee
        appUserService.delete(employe);
        dao.delete(employe);
    }


    @Transactional(rollbackFor = Exception.class)
    public void delete(Employe item) {
        deleteAssociated(item);
        dao.delete(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(List<Employe> items) {
        if (items == null || items.isEmpty()) return;
        items.forEach(this::delete);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteByIdIn(List<Long> ids) {
        ids.forEach(id -> {
            Employe item = findById(id);
            if (item != null) {
                deleteAssociated(item);
            }
        });
        dao.deleteByIdIn(ids);
    }

    //--------------- FIND AND DELETE BYs ----------------------
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByAdresseId(Long id) {
        Employe found = findByAdresseId(id);
        if (found == null) return 0;
        this.deleteAssociated(found);
        return dao.deleteByAdresseId(id);
    }

    @Override
    public Employe findByAdresseId(Long id) {
        return dao.findByAdresseId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByEntrepriseId(Long id) {
        if (id == null) return 0;
        List<Employe> found = findByEntrepriseId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByEntrepriseId(id);
    }

    @Override
    public List<Employe> findByEntrepriseId(Long id) {
        return dao.findByEntrepriseId(id);
    }

    //----------------------------------------------------------
    public void createAssociatedObject(Employe item) {
        if (item == null) return;
        ServiceHelper.createObject(item, Employe::getAdresse, adresseService::create);
    }

    public void createAssociatedList(Employe item) {
        if (item == null || item.getId() == null) return;
        ServiceHelper.createList(item, Employe::getDestinataireEmploye, DestinataireEmploye::setEmploye, destinataireEmployeService::create);
    }

    public void updateAssociatedList(Employe item) {
        if (item == null || item.getId() == null) return;
        ServiceHelper.updateList(
                item, destinataireEmployeService.findByEmployeId(item.getId()),
                item.getDestinataireEmploye(), DestinataireEmploye::setEmploye,
                destinataireEmployeService::update,
                destinataireEmployeService::delete
        );
    }

    public Long findMaxId() {
        return dao.findMaxId();
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteAssociated(Employe item) {
        deleteAssociatedList(item);
    }

    public void deleteAssociatedList(Employe item) {
        destinataireEmployeService.deleteByEmployeId(item.getId());
    }






    //----------------------------------------------------------
    @Autowired
    private EmployeDao dao;
    @Lazy
    @Autowired
    private AdresseService adresseService;
    @Lazy
    @Autowired
    private DestinataireEmployeService destinataireEmployeService;
    @Lazy
    @Autowired
    private EntrepriseService entrepriseService;
    @Lazy
    @Autowired
    private AppUserService appUserService;
    @Lazy
    @Autowired
    private RoleService roleService;

    @Lazy
    @Autowired
    private PermissionsAccesDao permissionsAccesDao;

    @Lazy
    @Autowired
    private PermissionsAccesService permissionsAccesService;




}
