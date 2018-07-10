package beans;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class User {
	private String email;
	private String password;
	private Set<Music> musicList;
	
	public User() {
		this.musicList = new HashSet<Music>();
	}

	@Override
	public String toString() {
		return "User [email=" + email + ", password=" + password + "]";
	}

	public User(String email, String password) {
		this.email = email;
		this.password = password;
		this.musicList = new HashSet<Music>();
	}

	public Set<Music> getMusicList() {
		return musicList;
	}

	public void setMusicList(Set<Music> musicList) {
		this.musicList = musicList;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
