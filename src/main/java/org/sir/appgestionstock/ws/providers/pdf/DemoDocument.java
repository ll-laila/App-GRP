/*package org.sir.appgestionstock.ws.providers.pdf;

import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.service.impl.mapper.DataMapper;
import org.sir.appgestionstock.service.impl.pdf.DocumentGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.List;
@RestController
public class DemoDocument {
    @Autowired
    private SpringTemplateEngine springTemplateEngine;
    @Autowired
    private DocumentGenerator documentGenerator;
    @Autowired
    private DataMapper dataMapper;
    @PostMapping(value ="/generate/document")
    public String generateDocument(@RequestBody List<Client> clientList){
        String finalHtml = null;
        Context dataContext = dataMapper.setData(clientList);
        finalHtml = springTemplateEngine.process("template",dataContext);
        documentGenerator.htmlToPdf(finalHtml);
        return "Success";
    }
}
*/