package org.sir.appgestionstock.ws.converter.ventes.commande;
import org.sir.appgestionstock.bean.core.ventes.commande.CommandeProduit;
import org.sir.appgestionstock.ws.dto.ventes.commande.CommandeProduitDto;
import org.sir.appgestionstock.ws.converter.produit.ProduitConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class CommandeProduitConverter {
@Autowired private CommandeConverter commandeConverter;
@Autowired private ProduitConverter produitConverter;
private boolean produit = true;
private boolean commande = true;
protected void configure(boolean value) {
this.commandeConverter.setCommandeProduit(value);
this.produitConverter.setCommandeProduit(value);
}
public final CommandeProduitDto toDto(CommandeProduit item) {
this.configure(false);
var dto = item != null ? convertToDto(item) : null;
this.configure(true);
return dto;
}
public final CommandeProduit toItem(CommandeProduitDto d) {
return d != null ? convertToItem(d) : null;
}
public final List<CommandeProduit> toItem(List<CommandeProduitDto> dtos) {
if (dtos == null) return null;
List<CommandeProduit> list = new ArrayList<>();
dtos.forEach(it -> list.add(toItem(it)));
return list;
}
public final List<CommandeProduitDto> toDto(List<CommandeProduit> items) {
if (items == null) return null;
List<CommandeProduitDto> list = new ArrayList<>();
items.forEach(it -> list.add(toDto(it)));
return list;
}
protected CommandeProduit convertToItem(CommandeProduitDto dto) {
var item = new CommandeProduit();
item.setId(dto.getId());
item.setTotal(dto.getTotal());
item.setQuantite(dto.getQuantite());
item.setDisque(dto.getDisque());
item.setProduit(produitConverter.toItem(dto.getProduit()));
item.setCommande(commandeConverter.toItem(dto.getCommande()));
item.setPrix(dto.getPrix());
item.setQuantite(dto.getQuantite());
return item;
}
protected CommandeProduitDto convertToDto(CommandeProduit item) {
var dto = new CommandeProduitDto();
dto.setId(item.getId());
dto.setTotal(item.getTotal());
dto.setQuantite(item.getQuantite());
dto.setDisque(item.getDisque());
dto.setProduit(produit? produitConverter.toDto(item.getProduit()): null);
dto.setCommande(commande? commandeConverter.toDto(item.getCommande()): null);
dto.setPrix(item.getPrix());
dto.setQuantite(item.getQuantite());
return dto;
}
public void setProduit(boolean value) {
this.produit = value;
}
public void setCommande(boolean value) {
this.commande = value;
}
public void setCommandeConverter(CommandeConverter value) {
this.commandeConverter = value;
}
public CommandeConverter getCommandeConverter() {
return commandeConverter;
}
public void setProduitConverter(ProduitConverter value) {
this.produitConverter = value;
}
public ProduitConverter getProduitConverter() {
return produitConverter;
}
}