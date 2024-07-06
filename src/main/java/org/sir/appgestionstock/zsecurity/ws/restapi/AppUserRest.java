package org.sir.appgestionstock.zsecurity.ws.restapi;

import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.zsecurity.permissions.RoleEnum;
import org.sir.appgestionstock.zsecurity.service.facade.AppUserService;
import org.sir.appgestionstock.zsecurity.ws.converter.AppUserConverter;
import org.sir.appgestionstock.zsecurity.ws.dto.AppUserDto;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/app-user")
@RestController
public class AppUserRest {
    private final AppUserService appUserService;
    private final AppUserConverter appUserConverter;

    public AppUserRest(AppUserService appUserService, AppUserConverter appUserConverter) {
        this.appUserService = appUserService;
        this.appUserConverter = appUserConverter;
    }

    @GetMapping()
    public List<AppUserDto> findAll() {
        List<AppUser> all = this.appUserService.findAll();
        return appUserConverter.toDto(all);
    }
    @GetMapping("/findByUser/{username}")
    public AppUser findByUsername(String username) {
        return appUserService.findByUsername(username);
    }

    @GetMapping("/id/{id}")
    public AppUserDto findById(@PathVariable Long id) {
        AppUser byId = appUserService.findById(id);
        return appUserConverter.toDto(byId);
    }

    @DeleteMapping("/id/{id}")
    public void deleteById(@PathVariable Long id) {
        appUserService.deleteById(id);
    }

    @PostMapping
    public AppUserDto save(@RequestBody AppUserDto userDto) {
        AppUser user = appUserConverter.toItem(userDto);
        user.setRoles(List.of(RoleEnum.ADMIN.getRole()));

        AppUser saved = appUserService.save(user);
        return appUserConverter.toDto(saved);
    }

    @PutMapping()
    public AppUserDto update(@RequestBody AppUserDto userDto) {
        AppUser user = appUserConverter.toItem(userDto);
        AppUser saved = appUserService.update(user);
        return appUserConverter.toDto(saved);
    }

    @DeleteMapping()
    public int delete(@RequestBody AppUserDto userDto) {
        AppUser user = appUserConverter.toItem(userDto);
        return appUserService.delete(user);
    }

    @GetMapping("/username/{username}")
    public AppUserDto findByUsernameWithRoles(@PathVariable String username) {
        return appUserConverter.toDto(appUserService.findByUsernameWithRoles(username));
    }


    @DeleteMapping("/username/{username}")
    public int deleteByUsername(@PathVariable String username) {
        return appUserService.deleteByUsername(username);
    }
}

