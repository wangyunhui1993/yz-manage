import axios from 'axios'
axios.defaults.withCredentials=true;
let base = window.g.base;


export const newUser = params => { return axios.post(`${base}/user/newUser`, params).then(res => res.data).catch(error=>error); };
export const selectAllUser = params => { return axios.post(`${base}/user/selectAllUser`, params).then(res => res.data).catch(error=>error); };
export const selectUsername = params => { return axios.post(`${base}/user/selectUsername`, params).then(res => res.data).catch(error=>error); };
export const updateUser = params => { return axios.post(`${base}/user/updateUser`, params).then(res => res.data).catch(error=>error); };
export const delectUser = params => { return axios.post(`${base}/user/delectUser`, params).then(res => res.data).catch(error=>error); };
export const updatePassword = params => { return axios.post(`${base}/user/updatePassword`, params).then(res => res.data).catch(error=>error); };

export const login = params => { return axios.post(`${base}/user/login`, params).then(res => res.data).catch(error=>error); };

export const selectAllEquipment = params => { return axios.post(`${base}/equipment/selectAllEquipment`, params).then(res => res.data).catch(error=>error); };
export const selectIndexEquipment = params => { return axios.post(`${base}/equipment/selectIndexEquipment`, params).then(res => res.data).catch(error=>error); };

export const selectGroup = params => { return axios.post(`${base}/group/selectGroup`, params).then(res => res.data).catch(error=>error); };
export const insertEquipment = params => { return axios.post(`${base}/equipment/insertEquipment`, params).then(res => res.data).catch(error=>error); };
export const deleteEquipment = params => { return axios.post(`${base}/equipment/deleteEquipment`, params).then(res => res.data).catch(error=>error); };
export const updateEquipment = params => { return axios.post(`${base}/equipment/updateEquipment`, params).then(res => res.data).catch(error=>error); };

export const insertGroup = params => { return axios.post(`${base}/group/insertGroup`, params).then(res => res.data).catch(error=>error); };

export const deleteGroup = params => { return axios.post(`${base}/group/deleteGroup`, params).then(res => res.data).catch(error=>error); };
export const updateGroupName = params => { return axios.post(`${base}/group/updateGroupName`, params).then(res => res.data).catch(error=>error); };

export const selectLog = params => { return axios.post(`${base}/log/selectLog`, params).then(res => res.data).catch(error=>error); };

export const insertRoad = params => { return axios.post(`${base}/road/insertRoad`, params).then(res => res.data).catch(error=>error); };
export const selectRoad = params => { return axios.post(`${base}/road/selectRoad`, params).then(res => res.data).catch(error=>error); };
export const updateRoad = params => { return axios.post(`${base}/road/updateRoad`, params).then(res => res.data).catch(error=>error); };
export const deleteRoad = params => { return axios.post(`${base}/road/deleteRoad`, params).then(res => res.data).catch(error=>error); };

export const selectEquipmentHot = params => { return axios.post(`${base}/log/selectEquipmentHot`, params).then(res => res.data).catch(error=>error); };
export const selectUserLogByTime = params => { return axios.post(`${base}/log/selectUserLogByTime`, params).then(res => res.data).catch(error=>error); };
export const selectLogByLastWeek = params => { return axios.post(`${base}/log/selectLogByLastWeek`, params).then(res => res.data).catch(error=>error); };
export const selectSuccessLog = params => { return axios.post(`${base}/log/selectSuccessLog`, params).then(res => res.data).catch(error=>error); };

export const insertPlayVideo = params => { return axios.post(`${base}/log/insertPlayVideo`, params).then(res => res.data).catch(error=>error);};
export const ptzControl = params => { return axios.post(`${base}/video/ptzControl`, params).then(res => res.data).catch(error=>error); };
export const jButtonAutoActionPerformed = params => { return axios.post(`${base}/video/jButtonAutoActionPerformed`, params).then(res => res.data).catch(error=>error); };
//ceshi
export const synchroEquipmentNumber = params => { return axios.post(`${base}/psql/synchroEquipmentNumber`, params).then(res => res.data).catch(error=>error); };


