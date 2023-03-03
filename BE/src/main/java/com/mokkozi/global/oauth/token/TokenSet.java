package com.mokkozi.global.oauth.token;

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
public class TokenSet {
	private String grantType;
	private String access;
	private String refresh;
	private Long accessTokenExpireln;
	private Long refreshTokenExpireln;
	private String authority;
	private String info;

	public void setInfo(String info) {
		this.info = info;
	}
}