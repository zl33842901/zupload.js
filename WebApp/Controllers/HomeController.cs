using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public void Upload()
        {
            foreach(var i in Request.Files)
            {
                //上传的文件
            }
            foreach(var i in Request.Form)
            {
                //其他参数
            }
        }
    }
}