package connectionUtil;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;

public class JdbcConnection {
	private static SessionFactory sessionFactory = null;
	
	private JdbcConnection()
	{
		
	}
	
	public static SessionFactory getSessionFactory()
	{
		if(sessionFactory==null)
		{
			//创建配置对像
			System.out.println("ooo");
			Configuration config = new Configuration().configure();
			System.out.println("yyy");
			//创建服务注册对象
			ServiceRegistry serviceRegistry = new ServiceRegistryBuilder().applySettings(config.getProperties()).buildServiceRegistry();
			System.out.println("uuu");
			//创建会话工厂
			SessionFactory sessionFactory = config.buildSessionFactory(serviceRegistry);
			System.out.println("iii");
			return sessionFactory;
		}
		else
			return sessionFactory;
	}
}
