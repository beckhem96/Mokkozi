package com.mokkozi.domain.member.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Table(name="members")
@ToString
@Entity
@Getter
@NoArgsConstructor
@Builder
public class Members {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;//primary key
	private String email; //로그인시 사용하는 아이디
	private String password; //비밀번호
	private String nickname; //활동할 닉네임
	
	private String refreshToken;
	
	@OneToMany(mappedBy = "members", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@Builder.Default
	private List<Authority> roles =new ArrayList<>();
	
	public void setRoles(List<Authority> role) {
		this.roles = role;
		role.forEach(o -> o.setMembers(this));
	}
	
	public void setRefreshToken(String refreshToken) { 
        this.refreshToken = refreshToken;
    }
	
	public Members(long id, String email, String password, String nickname, String refreshToken, List<Authority> roles) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.nickname = nickname;
		this.refreshToken = refreshToken;
		this.roles = roles;
	}
	
	
}
