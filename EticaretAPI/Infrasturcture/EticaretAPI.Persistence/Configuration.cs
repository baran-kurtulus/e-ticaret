using Microsoft.Extensions.Configuration;

namespace EticaretAPI.Persistence;

static class Configuration
{
    public static string ConnectionString {
        get
        {
            ConfigurationManager configurationManager = new ConfigurationManager();//Bunun için extensionsConfiguration nugetten eklenmeli
            configurationManager.SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../../Presentation/EticaretAPI.API"));//appsettings.json un path
            configurationManager.AddJsonFile("appsettings.json");//Bunun için de extensionsConfigurationJson nugetten eklenmeli
            return configurationManager.GetConnectionString("PostgreSQL");
        }
        
    }
}