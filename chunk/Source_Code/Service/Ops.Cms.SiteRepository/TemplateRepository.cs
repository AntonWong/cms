﻿using Ops.Cms.DAL;
using Ops.Cms.Domain.Implement.Site.Template;
using Ops.Cms.Domain.Interface.Site.Category;
using Ops.Cms.Domain.Interface.Site.Template;
using System.Collections.Generic;

namespace Ops.Cms.ServiceRepository
{
    public class TemplateRepository:BaseTemplateRepository,ITemplateRepository
    {
        private TemplateBindDAL tpldal = new TemplateBindDAL();

        public ITemplateBind GetTemplateBind(int bindRelationId, TemplateBindType templateBindType)
        {
            return this.GetBind(templateBindType, bindRelationId);
        }

        /// <summary>
        ///模板绑定列表
        /// </summary>
        private IList<ITemplateBind> TemplateBinds
        {
            get
            {
                if (RepositoryDataCache._tplBinds == null)
                {
                    IList<ITemplateBind> tpls = new List<ITemplateBind>();
                    ITemplateBind tpl;
                    tpldal.GetBindList(rd =>
                    {
                        while (rd.Read())
                        {
                            tpl = this.CreateTemplateBind(
                                int.Parse(rd["id"].ToString()),
                                (TemplateBindType)int.Parse(rd["bindType"].ToString()),
                                rd["tplPath"].ToString()
                                );
                            tpl.BindRefrenceId = int.Parse(rd["bindId"].ToString());
                            tpls.Add(tpl);
                        }
                    });

                    RepositoryDataCache._tplBinds = tpls;
                }

                return RepositoryDataCache._tplBinds;
            }
        }


        public IEnumerable<ITemplateBind> GetTemplateBindsForCategory(ICategory category)
        {
            //ITemplateBind bind;

            //bind = this.GetBind(TemplateBindType.CategoryTemplate, category.ID);

            //如果栏目不存在绑定，则查找模块的绑定
            //if (false || bind == null)
            //{
            //    int moduleID = cbll.Get(a => a.ID == categoryID).ModuleID;
            //    bind = GetBind(TemplateBindType.ModuleCategoryTemplate, moduleID.ToString());
            //}

           ITemplateBind bind=  this.GetBind(TemplateBindType.CategoryTemplate, category.ID);

           if (bind != null) yield return bind;
           bind= this.GetBind(TemplateBindType.CategoryArchiveTemplate, category.ID);
           if (bind != null) yield return bind;
            
            /*
            
            IDictionary<TemplateBindType, ITemplateBind> templates = new Dictionary<TemplateBindType, ITemplateBind>();
            if (bind != null)
            {
                templates.Add(TemplateBindType.CategoryTemplate, bind);
            }

            if (bindArchive != null)
            {
                templates.Add(TemplateBindType.CategoryArchiveTemplate, bindArchive);
            }
            return templates;
            */
        }

        private ITemplateBind GetBind(TemplateBindType templateBindType, int bindRefrenceId)
        {
            foreach (ITemplateBind bind in this.TemplateBinds)
            {
                if (bind.BindType == templateBindType && bind.BindRefrenceId == bindRefrenceId)
                    return bind;
            }
            return null;
        }


        public int SaveTemplateBind(ITemplateBind templateBind,int bindRefrenceId)
        {
            tpldal.SetBind(templateBind.BindType, bindRefrenceId, templateBind.TplPath);
            RepositoryDataCache.ClearTemplateBinds();
            return templateBind.ID;
        }


        public void RemoveBind(TemplateBindType templateBindType, int bindRefrenceId)
        {
            bool result = tpldal.RemoveBind(templateBindType, bindRefrenceId);
            RepositoryDataCache.ClearTemplateBinds();
        }
    }
}
