package impl;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import beans.Music;
import beans.User;
import connectionUtil.JdbcConnection;
import Dao.UserDao;

public class UserImpl implements UserDao{
	
	private List getUserFromDBWithEmail(User u)
	{
		Transaction tx = null;
		String hql = "";
		
		Session session = JdbcConnection.getSessionFactory().getCurrentSession();
		tx = session.beginTransaction();
		hql = "from User where email=? ";
		Query query = session.createQuery(hql);
		query.setParameter(0, u.getEmail());
		List list = query.list();
		tx.commit();
		
		return list;
	}
	
	private List getUserFromDBWithEmailAndPassword(User u)
	{
		Transaction tx = null;
		String hql = "";
		
		Session session = JdbcConnection.getSessionFactory().getCurrentSession();
		tx = session.beginTransaction();
		hql = "from User where email=? and password=? ";
		Query query = session.createQuery(hql);
		query.setParameter(0, u.getEmail());
		query.setParameter(1, u.getPassword());
		List list = query.list();
		tx.commit();
		
		return list;
	}
	
	@Override
	public boolean userLogin(User u) {
		
		try
		{
			List list = getUserFromDBWithEmailAndPassword(u);
			if(list.size()>0)
				return true;
			else
				return false;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean userRegister(User u) {

		Transaction tx = null;
		try
		{
			if(getUserFromDBWithEmail(u).size()>0)
				return false;
			Session session = JdbcConnection.getSessionFactory().getCurrentSession();
			tx = session.beginTransaction();
			session.save(u);
			session.flush();
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
	public boolean userUpdatePassword(User u) {
		
		Transaction tx = null;
		try
		{
			Session session = JdbcConnection.getSessionFactory().getCurrentSession();
			tx = session.beginTransaction();
			User uu = (User) session.get(u.getClass(), u.getEmail());
			if(uu.getMusicList() == null)
				uu.setMusicList(new HashSet<Music>());
			uu.setPassword(u.getPassword());
			session.saveOrUpdate(uu);
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
	public boolean userConfirmEmail(User u) {
		try
		{
			if(getUserFromDBWithEmail(u).size()>0)
				return true;
			else
				return false;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean userAddMusic(User u, Music m) {
		Transaction tx = null;
		try
		{
			Session session = JdbcConnection.getSessionFactory().getCurrentSession();
			tx = session.beginTransaction();
			
			User uu = (User) session.get(u.getClass(), u.getEmail());
			System.out.println(uu);
			System.out.println(u.getEmail());
			if(uu.getMusicList() == null)
				uu.setMusicList(new HashSet<Music>());
			uu.getMusicList().add(m);
			
			session.saveOrUpdate(uu);
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
	public Set<Music> userGetMusic(User u) {
		Session session = JdbcConnection.getSessionFactory().getCurrentSession();
		Transaction tx = session.beginTransaction();
		User uu = (User) session.get(u.getClass(), u.getEmail());
		if(uu.getMusicList() == null)
			uu.setMusicList(new HashSet<Music>());
		Set<Music> l = uu.getMusicList();
		//tx.commit();
		return l;
	}

	

	
	
}
