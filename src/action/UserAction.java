package action;

import java.io.IOException;
import java.util.Set;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

import beans.Music;
import beans.User;
import Dao.UserDao;
import impl.UserImpl;
import net.sf.json.JSONArray;

public class UserAction extends SuperAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public void login()
	{
		UserDao udao = new UserImpl();
		User user = new User();
		user.setEmail(this.request.getParameter("email"));
		user.setPassword(this.request.getParameter("password"));
		if(udao.userLogin(user))
		{
			try {
				this.response.getWriter().write("true");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else
		{
			try {
				this.response.getWriter().write("false");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	
	public void register()
	{
		UserDao udao = new UserImpl();
		User user = new User();
		user.setEmail(this.request.getParameter("email"));
		user.setPassword(this.request.getParameter("password"));
		if(udao.userRegister(user))
		{
			try {
				this.response.getWriter().write("true");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else
		{
			try {
				this.response.getWriter().write("false");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	
	public void confirmEmail()
	{
		UserDao udao = new UserImpl();
		User user = new User();
		user.setEmail(this.request.getParameter("email"));
		if(udao.userConfirmEmail(user))
		{
			try {
				this.response.getWriter().write("true");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else
		{
			try {
				this.response.getWriter().write("false");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}


	public void updatePassword()
	{
		UserDao udao = new UserImpl();
		User user = new User();
		user.setEmail(this.request.getParameter("email"));
		user.setPassword(this.request.getParameter("password"));
		if(udao.userUpdatePassword(user))
		{
			try {
				this.response.getWriter().write("true");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else
		{
			try {
				this.response.getWriter().write("false");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public void addMusic()
	{
		UserDao udao = new UserImpl();
		User user = new User();
		user.setEmail(this.request.getParameter("email"));
		user.setPassword(this.request.getParameter("password"));
		System.out.println(user.getEmail() + user.getPassword());

		Music music = new Music();
		music.setAuthor(this.request.getParameter("author"));
		music.setTitle(this.request.getParameter("title"));
		music.setPicUrl(this.request.getParameter("picUrl"));
		music.setMusicUrl(this.request.getParameter("musicUrl"));
		music.setLyricUrl(this.request.getParameter("lyricUrl"));
		
		user.getMusicList().add(music);
		music.getUserList().add(user);
		
		if(udao.userAddMusic(user, music))
		{
			try {
				this.response.getWriter().write("true");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		else
		{
			try {
				this.response.getWriter().write("false");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public void getMusic()
	{
		UserDao udao = new UserImpl();
		User user = new User();
		user.setEmail(this.request.getParameter("email"));
		user.setPassword(this.request.getParameter("password"));
	
		Set<Music> s = udao.userGetMusic(user);
		
		if(s != null)
		{
			try {
				JSONArray jo = JSONArray.fromObject(s);
				String ss = jo.toString();
				String sss = new String(ss.getBytes("gbk"), "utf-8");
				System.out.println(jo);
				this.response.setCharacterEncoding("UTF-8");
				
				this.response.setContentType("text/html;charset=utf-8");
				this.response.getWriter().write(jo.toString());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		else
		{
			try {
				this.response.getWriter().write("false");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
}
