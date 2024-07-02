package org.sir.appgestionstock.dao.parametres;
import org.sir.appgestionstock.bean.core.parametres.MethodePaiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface MethodePaiementDao extends JpaRepository<MethodePaiement, Long> {
int deleteByIdIn(List<Long> ids);
}