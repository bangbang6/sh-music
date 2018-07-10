package test;

import java.util.EnumSet;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

//import org.hibernate.boot.spi.MetadataImplementor;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.hibernate.tool.hbm2ddl.SchemaExport;

import org.junit.Test;

public class TestUsers {
	@Test
	public void testSchemaExport() {
		Configuration config = new Configuration().configure();
		ServiceRegistry serviceRegistry = new ServiceRegistryBuilder().applySettings(config.getProperties())
				.buildServiceRegistry();
		SessionFactory sessionFactory = config.buildSessionFactory(serviceRegistry);
		Session session = sessionFactory.getCurrentSession();
		//MetadataImplementor metadataImplementor = (MetadataImplementor) new MetadataSources(serviceRegistry)
		//		.buildMetadata();
		
		  SchemaExport export = new SchemaExport(config);  

		  export.create(true,true);

	}
}
