package com.mokkozi.domain.member.dto;

import lombok.Data;

@Data
public class MembersCreateRequest {
	private String email;
	private String password;
	private String nickname;

}
