package beans;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class Music implements Comparable<Music>{
	private String musicUrl;
	private String author;
	private String title;
	private String picUrl;
	private String lyricUrl;
	private long times;
	private List<String> comments;
	private Set<User> userList;
	
	public Set<User> getUserList() {
		return userList;
	}

	public void setUserList(Set<User> userList) {
		this.userList = userList;
	}

	public long getTimes() {
		return times;
	}

	public void setTimes(long times) {
		this.times = times;
	}

	public List<String> getComments() {
		return comments;
	}

	public void setComments(List<String> comments) {
		this.comments = comments;
	}

	public Music(String author, String title, String picUrl, String musicUrl, String lyricUrl) {
		this.author = author;
		this.title = title;
		this.picUrl = picUrl;
		this.musicUrl = musicUrl;
		this.lyricUrl = lyricUrl;
		this.comments = new LinkedList<String>();
		this.userList = new HashSet<User>();
		this.times = 0;
	}

	public Music() {
		this.userList = new HashSet<User>();
		this.comments = new LinkedList<String>();
		this.times = 0;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPicUrl() {
		return picUrl;
	}

	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}

	public String getMusicUrl() {
		return musicUrl;
	}

	public void setMusicUrl(String musicUrl) {
		this.musicUrl = musicUrl;
	}

	public String getLyricUrl() {
		return lyricUrl;
	}

	public void setLyricUrl(String lyricUrl) {
		this.lyricUrl = lyricUrl;
	}

	@Override
	public String toString() {
		return "Music [author=" + author + ", title=" + title + ", picUrl=" + picUrl + ", musicUrl=" + musicUrl
				+ ", lyricUrl=" + lyricUrl + "]";
	}
	@Override
	public int compareTo(Music o) {
		// TODO Auto-generated method stub
		if(this.getTimes() - o.getTimes() < 0)
			return 1;
		else if(this.getTimes() - o.getTimes() == 0)
			return 0;
		else
			return -1;
	}

	
}
