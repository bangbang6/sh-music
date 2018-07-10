package Dao;

import java.util.List;
import java.util.Set;

import beans.Music;
import beans.User;

public interface UserDao {
	
	public boolean userLogin(User u);
	public boolean userRegister(User u);
	public boolean userUpdatePassword(User u);
	public boolean userConfirmEmail(User u);
	public boolean userAddMusic(User u, Music m);
	public Set<Music> userGetMusic(User u);
}
