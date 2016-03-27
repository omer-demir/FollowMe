using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FollowMePlain.Data;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Cors.Infrastructure;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;

namespace FollowMePlain {
    public class Startup {
        public IConfigurationRoot Configuration { get; set; }

        public Startup() {
            var builder = new ConfigurationBuilder().AddJsonFile("generalconfig.json", true).AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services) {
            services.AddMvc().AddJsonOptions(a => a.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());
            services.AddSingleton<IBlogRepository, BlogRepository>();
            services.AddCors(options => options.AddPolicy("AllowAll", new CorsPolicy {
                Origins = { "*" },
                Headers = { "*" },
                Methods = { "*" },
                SupportsCredentials = true
            }));
            //services.AddCaching();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory logger) {

            logger.AddConsole(Configuration.GetSection("Logging"));
            logger.AddDebug();

            app.UseCors("AllowAll");

            app.UseMvc(a => {
                a.MapRoute("Default", "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseIISPlatformHandler();


            app.UseStaticFiles();
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
