package Dao;

import java.util.List;

import beans.Music;

public interface MusicDao {
	public boolean Music_upload(Music m);
	public List<Object[]> Music_get(String title);
	public boolean Music_addComment(Music m);
	public boolean Music_updateTimes(Music m);
	public List<String> Music_getComments(Music m);
	public List<Music> Music_getTop3();
}
