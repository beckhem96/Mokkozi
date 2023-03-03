package com.mokkozi.domain.member.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name="authority")
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Authority {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
	private long id;
	private String name;
	
	
	@JoinColumn(name = "members")
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Members members;

	public void setMembers(Members members) {
		this.members = members;
	}
}
