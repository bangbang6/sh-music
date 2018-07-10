package action;

import java.io.IOException;
import java.util.List;


import beans.Music;
import beans.User;
import Dao.MusicDao;
import Dao.UserDao;
import impl.MusicImpl;
import impl.UserImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class MusicAction extends SuperAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void upload()
	{
		MusicDao mdao = new MusicImpl();
		Music music = new Music();
		music.setAuthor(this.request.getParameter("author"));
		music.setTitle(this.request.getParameter("title"));
		music.setPicUrl(this.request.getParameter("picUrl"));
		music.setMusicUrl(this.request.getParameter("musicUrl"));
		music.setLyricUrl(this.request.getParameter("lyricUrl"));
		if(mdao.Music_upload(music))
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

	public void get()
	{
		MusicDao mdao = new MusicImpl();
		String title = this.request.getParameter("title");
		List<Object[]> list = mdao.Music_get(title);
		JSONArray jo = JSONArray.fromObject(list);
		try {
			this.response.setCharacterEncoding("UTF-8");
			String s = jo.toString();
			String ss = new String(s.getBytes("gbk"), "utf-8");
			System.out.println(jo);
			this.response.getWriter().write(jo.toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void addComment()
	{
		MusicDao mdao = new MusicImpl();

		String comment = this.request.getParameter("comment");
		
		Music music = new Music();
		music.setAuthor(this.request.getParameter("author"));
		music.setTitle(this.request.getParameter("title"));
		music.setPicUrl(this.request.getParameter("picUrl"));
		music.setMusicUrl(this.request.getParameter("musicUrl"));
		music.setLyricUrl(this.request.getParameter("lyricUrl"));
	
		music.getComments().add(comment);
		
		if(mdao.Music_addComment(music))
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
	
	public void updateTimes()
	{
		MusicDao mdao = new MusicImpl();

		Music music = new Music();
		music.setAuthor(this.request.getParameter("author"));
		music.setTitle(this.request.getParameter("title"));
		music.setPicUrl(this.request.getParameter("picUrl"));
		music.setMusicUrl(this.request.getParameter("musicUrl"));
		music.setLyricUrl(this.request.getParameter("lyricUrl"));
		
		if(mdao.Music_updateTimes(music))
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
	
	public void getComments()
	{
		MusicDao mdao = new MusicImpl();

		Music music = new Music();
		music.setAuthor(this.request.getParameter("author"));
		music.setTitle(this.request.getParameter("title"));
		music.setPicUrl(this.request.getParameter("picUrl"));
		music.setMusicUrl(this.request.getParameter("musicUrl"));
		music.setLyricUrl(this.request.getParameter("lyricUrl"));
		
		List<String> comments = mdao.Music_getComments(music);
		if(comments != null)
		{
			try {
				JSONArray jo = JSONArray.fromObject(comments);
				this.response.setCharacterEncoding("UTF-8");
				this.response.setContentType("text/html;charset=utf-8");
				this.response.getWriter().write(jo.toString());
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
	public void getTop3()
	{
		MusicDao mdao = new MusicImpl();
		
		List<Music> list = mdao.Music_getTop3();
		
		JSONArray jo = JSONArray.fromObject(list);
		try {
			this.response.setCharacterEncoding("UTF-8");
			
			this.response.setContentType("text/html;charset=utf-8");
			this.response.getWriter().write(jo.toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
