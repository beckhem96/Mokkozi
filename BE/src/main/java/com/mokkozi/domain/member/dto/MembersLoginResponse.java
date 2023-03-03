package com.mokkozi.domain.member.dto;

import java.util.ArrayList;
import java.util.List;

import com.mokkozi.domain.member.entity.Authority;
import com.mokkozi.domain.member.entity.Members;
import com.mokkozi.global.oauth.token.TokenDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MembersLoginResponse {
	private Long id;

    private String nickname;


    private String email;

    private List<Authority> roles = new ArrayList<>();

    private String token;

    public MembersLoginResponse(Members member) {
        this.id = member.getId();
        this.nickname = member.getNickname();
        this.email = member.getEmail();
        this.roles = member.getRoles();
    }
}
