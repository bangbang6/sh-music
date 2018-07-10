package impl;

import java.util.LinkedList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import beans.Music;
import connectionUtil.JdbcConnection;
import Dao.MusicDao;

public class MusicImpl implements MusicDao{

	@Override
	public boolean Music_upload(Music m) {

		Transaction tx = null;
		try
		{
			if(getMusicFromDBWithMusicUrl(m).size()>0)
				return false;
			Session session = JdbcConnection.getSessionFactory().getCurrentSession();
			tx = session.beginTransaction();
			session.save(m);
			tx.commit();
			return true;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
		finally
		{
			tx = null;
		}
	}

	private List getMusicFromDBWithMusicUrl(Music m) {
		Transaction tx = null;
		String hql = "";
		
		Session session = JdbcConnection.getSessionFactory().getCurrentSession();
		tx = session.beginTransaction();
		hql = "from Music where musicUrl=? ";
		Query query = session.createQuery(hql);
		query.setParameter(0, m.getMusicUrl());
		List list = query.list();
		tx.commit();
		
		return list;
	}
	
	private List<Object[]> getMusicFromDBWithTitle(String title) {
		Transaction tx = null;
		String hql = "";
		
		Session session = JdbcConnection.getSessionFactory().getCurrentSession();
		tx = session.beginTransaction();
		hql = "from Music where ? IN (title)";
		Query query = session.createQuery(hql);
		query.setParameter(0, title);
		List<Object[]> list = query.list();
		tx.commit();
		
		return list;
	}
	
	@Override
	public List<Object[]> Music_get(String title) {
		try
		{
			return getMusicFromDBWithTitle(title);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public boolean Music_addComment(Music m) {
		if(Music_upload(m))
			return true;
		Transaction tx = null;
		try
		{
			Session session = JdbcConnection.getSessionFactory().getCurrentSession();
			tx = session.beginTransaction();
			
			Music mm = (Music) session.get(m.getClass(), m.getMusicUrl());
			String s = m.getComments().get(0);
			if(mm.getComments() == null)
				mm.setComments(new LinkedList<String>());
			mm.getComments().add(s);
			
			session.saveOrUpdate(mm);
			tx.commit();
			return true;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
		finally
		{
			tx = null;
		}
	}

	@Override
	public boolean Music_updateTimes(Music m) {
		Transaction tx = null;
		try
		{
			if(getMusicFromDBWithMusicUrl(m).size()<=0)
				return false;
			Session session = JdbcConnection.getSessionFactory().getCurrentSession();
			tx = session.beginTransaction();
			
			Music mm = (Music) session.get(m.getClass(), m.getMusicUrl());
			mm.setTimes(mm.getTimes() + 1);
			
			session.saveOrUpdate(mm);
			tx.commit();
			return true;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
		finally
		{
			tx = null;
		}
	}

	@Override
	public List<String> Music_getComments(Music m) {
		if(getMusicFromDBWithMusicUrl(m).size()<=0)
			Music_upload(m);
		Session session = JdbcConnection.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		Music mm = (Music) session.get(m.getClass(), m.getMusicUrl());
		System.out.println(mm);
		List<String> l = mm.getComments();
		return l;
	}
	@Override
	public List<Music> Music_getTop3() {
		// TODO Auto-generated method stub
		Session session = JdbcConnection.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		Query query =session.createQuery("from Music");
		List<Music> list = query.list();
		list.sort(null);
		return list.subList(0, 4);
	}
}
