import { observable, action } from "mobx";
import * as api from "@/api";
import moment from "moment";
import {
  IInseretcicdJob,
  IListcicdjob,
  IWorkListRes,
  IWorkListResTable,
  IQuerycicdjob,
  IStatustaskrun,
  IWorkHistoryTable,
  IQueryproject,
  IQueryprojectRes,
  IGettaskrunpodRes,
  IBaseSearch,
  IApresult,
  IGetcicdinfo,
  IReplicas,
  ICanaryPercent,
  IBaseupdateimage,
} from "@/interface/workflow.interface";
class Store {
  @observable public pageNo: number = 1;
  @observable public pageSize: number = 10;
  @observable public total: number = 0;
  @observable public project_id?: string = "";
  @observable public search_team?: string = undefined;
  @observable public workFlowList: IWorkListResTable[] = [];
  @observable public workHistoryList: IWorkHistoryTable[] = [];
  @observable public workFlowOne?: IWorkListResTable = undefined;
  @observable public appinfo: IApresult = null;

  @action public async inseretcicdjob(data: IInseretcicdJob) {
    try {
      await api.inseretcicdjob(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async updatecicdjob(data: IInseretcicdJob) {
    try {
      await api.updatecicdjob(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  // 查看详情
  @action public async listcicdjob(data: IListcicdjob) {
    try {
      const res: IWorkListRes = await api.listcicdjob(data);
      const workFlowList = res.data || [];
      workFlowList.forEach((item) => {
        item.update_time = moment(item.update_time).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        let findOne = this.workFlowList.find((v) => v.id === item.id);
        if (findOne && findOne.stepIndex && item.nowstatus === 1) {
          item.stepIndex = findOne.stepIndex;
          item.stepName = findOne.stepName;
        }
      });
      this.workFlowList = workFlowList;
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async querycicdjob(data: IQuerycicdjob) {
    try {
      this.workFlowOne = await api.querycicdjob(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  //cicd
  @action public async runcicdjob(data: IBaseSearch) {
    try {
      let taskRunName = await api.runcicdjob(data);
      return taskRunName;
    } catch (error) {
      return false;
    }
  }
  @action public async canaryruncicdjob(data: IBaseSearch) {
    try {
      await api.canaryruncicdjob(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async statustaskrun(data: IStatustaskrun) {
    try {
      await api.statustaskrun(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async listcicdjobhistory(data: IBaseSearch) {
    try {
      const workHistoryList: IWorkHistoryTable[] =
        (await api.listcicdjobhistory(data)) || [];
      workHistoryList.forEach((item) => {
        item.build_time = moment(item.build_time).format("YYYY-MM-DD HH:mm:ss");
      });
      this.workHistoryList = workHistoryList;
      return true;
    } catch (error) {
      return false;
    }
  }
  //查询单个项目
  @action public async queryproject(data: IQueryproject) {
    try {
      let res = await api.queryproject<IQueryprojectRes>({
        project_id: data.project_id,
      });
      return data.isApp ? res.project_token : res.project_jobtoken;
    } catch (error) {
      return false;
    }
  }
  @action public async gettaskrunpod(data: IBaseSearch) {
    try {
      let res: IGettaskrunpodRes = await api.gettaskrunpod<IGettaskrunpodRes>(
        data
      );
      return res;
    } catch (error) {
      return false;
    }
  }
  //删除项目
  @action public async deletecicdjob(data: IBaseSearch) {
    try {
      await api.deletecicdjob(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  //获取app信息
  @action public async getappinfo(data: IBaseSearch) {
    try {
      this.appinfo = await api.getappinfo<IApresult>(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  //获取信息

  @action public async getcicdinfo(data: IBaseSearch) {
    try {
      return await api.getcicdinfo<IGetcicdinfo>(data);
    } catch (error) {
      return false;
    }
  }
  //停止工作流
  @action public async stopcicdjob(data: IBaseSearch) {
    try {
      await api.stopcicdjob(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  //回滚
  @action public async rollback(data: IBaseSearch) {
    try {
      await api.rollback(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  //设置副本数
  @action public async replicas(data: IReplicas) {
    try {
      await api.replicas(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async canaryPercent(data: ICanaryPercent) {
    try {
      await api.canaryPercent(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async baseupdateimage(data: IBaseupdateimage) {
    try {
      await api.baseupdateimage(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async gitbranchCheck(gitLabURL: string) {
    try {
      const data = await api.gitbranchCheck(gitLabURL);
      return data;
    } catch (error) {
      return false;
    }
  }
}

export default new Store();
