import axios from 'axios'

//测试
// let base = 'http://localhost/api/orgadmin/apitest/company';
export const netName = '扬州交通局控制中心管理平台-测试版本';		
export const ip_addr = 'http://www.taiibao.com';
let base = 'http://47.92.108.5/api/orgadmin/apitest/company';




//正式
// export const netName = '永沁福利企业管理系统';
// export const ip_addr = 'http://47.92.70.129';
// let base = 'http://47.92.70.129/api/orgadmin/apitest/company';








export const requestLogin = params => { return axios.post(`${base}/loginAdmin`, params).then(res => res.data); };
export const requestsendDelayEmail = params => { return axios.post(`${base}/sendDelayEmail`, params).then(res => res.data); };
export const requestDelayEmailList = params => { return axios.post(`${base}/getDelayEmailList`, params).then(res => res.data); };
export const companyRechargeToUsers = params => { return axios.post(`${base}/rechargeToUsers`, params).then(res => res.data); };
export const companyAddUsers = params => { return axios.post(`${base}/addUsers`, params).then(res => res.data); };

export const getUserByInformation = params => { return axios.post(`${base}/userController/getUserByInformation`, params).then(res => res.data); };

export const getUserInfoList = params => { return axios.post(`${base}/userController/getUserInfoList`, params).then(res => res.data).catch(error=>error); };
export const getUsersCount = params => { return axios.post(`${base}/getUsersCount`, params).then(res => res.data).catch(error=>error); };
export const getUserInfo = params => { return axios.post(`${base}/getUserInfo`, params).then(res => res.data).catch(error=>error); };
export const updateUserInfo = params => { return axios.post(`${base}/updateUserInfo`, params).then(res => res.data).catch(error=>error); };
export const addUser = params => { return axios.post(`${base}/addUser`, params).then(res => res.data).catch(error=>error); };
export const updateProductExtraInfo = params => { return axios.post(`${base}/productController/updateProductExtraInfo`, params).then(res => res.data).catch(error=>error); };






export const provinceAll = params => { return axios.post(`${base}/userController/getProvinceList`, params).then(res => res.data).catch(error=>error); };
export const cityByProvince = params => { return axios.post(`${base}/userController/getCityByProvince`, params).then(res => res.data).catch(error=>error); };
export const districtByCity = params => { return axios.post(`${base}/userController/getDistrictByCity`, params).then(res => res.data).catch(error=>error); };
export const userAddress = params => { return axios.post(`${base}/userController/getUserAddressList`, params).then(res => res.data).catch(error=>error); };
export const AddUserAddress = params => { return axios.post(`${base}/userController/addUserAddressInfo`, params).then(res => res.data).catch(error=>error); };
export const UpdUserAddress = params => { return axios.post(`${base}/userController/updateUserAddressInfo`, params).then(res => res.data).catch(error=>error); };
export const DelUserAddress = params => { return axios.post(`${base}/userController/deleteUserAddressInfo`, params).then(res => res.data).catch(error=>error); };
export const addUserList = params => { return axios.post(`${base}/addUserList`, params).then(res => res.data).catch(error=>error); };
export const rechargeToUsers = params => { return axios.post(`${base}/rechargeToUsers`, params).then(res => res.data).catch(error=>error); };
export const getAdminInfo = params => { return axios.post(`${base}/getAdminInfo`, params).then(res => res.data).catch(error=>error); };
export const addSimUserInfo = params => { return axios.post(`${base}/productController/addSimUserInfo`, params).then(res => res.data).catch(error=>error); };
export const addUserByMobileInfo = params => { return axios.post(`${base}/productController/addUserByMobileInfo`, params).then(res => res.data).catch(error=>error); };
export const addUserByMobileNoSendInfo = params => { return axios.post(`${base}/productController/addUserByMobileNoSendInfo`, params).then(res => res.data).catch(error=>error); };




export const changeAdminPwd = params => { return axios.post(`${base}/changeAdminPwd`, params).then(res => res.data).catch(error=>error); };
export const addCompanyAdmin = params => { return axios.post(`${base}/addCompanyAdmin`, params).then(res => res.data).catch(error=>error); };
export const getSysuserList = params => { return axios.post(`${base}/productController/getSysuserList`, params).then(res => res.data).catch(error=>error); };
export const getSysRoleList = params => { return axios.post(`${base}/productController/getSysRoleList`, params).then(res => res.data).catch(error=>error); };
export const addSysuserInfo = params => { return axios.post(`${base}/productController/addSysuserInfo`, params).then(res => res.data).catch(error=>error); };
export const updateSysuserInfo = params => { return axios.post(`${base}/productController/updateSysuserInfo`, params).then(res => res.data).catch(error=>error); };

export const addSysRoleInfo = params => { return axios.post(`${base}/productController/addSysRoleInfo`, params).then(res => res.data).catch(error=>error); };
export const updateSysRoleInfo = params => { return axios.post(`${base}/productController/updateSysRoleInfo`, params).then(res => res.data).catch(error=>error); };
export const deleteSysRoleInfo = params => { return axios.post(`${base}/productController/deleteSysRoleInfo`, params).then(res => res.data).catch(error=>error); };

export const deleteSysuserInfo = params => { return axios.post(`${base}/productController/deleteSysuserInfo`, params).then(res => res.data).catch(error=>error); };
export const rechargeSysAdmin = params => { return axios.post(`${base}/productController/rechargeSysAdmin`, params).then(res => res.data).catch(error=>error); };
export const getRechargelist = params => { return axios.post(`${base}/productController/getRechargelist`, params).then(res => res.data).catch(error=>error); };

export const getProductList = params => { return axios.post(`${base}/productController/getProductList`, params).then(res => res.data).catch(error=>error); };
export const getProductInfo = params => { return axios.post(`${base}/productController/getProductInfo`, params).then(res => res.data).catch(error=>error); };
export const getProductListBysearch = params => { return axios.post(`${base}/productController/getProductListBysearch`, params).then(res => res.data).catch(error=>error); };
export const updateProductInfo = params => { return axios.post(`${base}/productController/updateProductInfo`, params).then(res => res.data).catch(error=>error); };
export const addProductInfo = params => { return axios.post(`${base}/productController/addProductInfo`, params).then(res => res.data).catch(error=>error); };
export const deleteProductInfo = params => { return axios.post(`${base}/productController/deleteProductInfo`, params).then(res => res.data).catch(error=>error); };
export const getProductExtraInfo = params => { return axios.post(`${base}/productController/getProductExtraInfo`, params).then(res => res.data).catch(error=>error); };



export const getProductSetList = params => { return axios.post(`${base}/productSetController/getProductSetList`, params).then(res => res.data).catch(error=>error); };
export const addProductSetInfo = params => { return axios.post(`${base}/productSetController/addProductSetInfo`, params).then(res => res.data).catch(error=>error); };
export const updateProductSetInfo = params => { return axios.post(`${base}/productSetController/updateProductSetInfo`, params).then(res => res.data).catch(error=>error); };
export const deleteProductSetInfo = params => { return axios.post(`${base}/productSetController/deleteProductSetInfo`, params).then(res => res.data).catch(error=>error); };
export const getSMSCode = params => { return axios.post(`${base}/WexinuserController/getSMSCode`, params).then(res => res.data).catch(error=>error); };



export const getCategoryList = params => { return axios.post(`${base}/productController/getCategoryList`, params).then(res => res.data).catch(error=>error); };
export const addCategoryInfo = params => { return axios.post(`${base}/productController/addCategoryInfo`, params).then(res => res.data).catch(error=>error); };
export const getCategoryInfo = params => { return axios.post(`${base}/productController/getCategoryInfo`, params).then(res => res.data).catch(error=>error); };
export const updateCategoryInfo = params => { return axios.post(`${base}/productController/updateCategoryInfo`, params).then(res => res.data).catch(error=>error); };
export const deleteCategoryInfo = params => { return axios.post(`${base}/productController/deleteCategoryInfo`, params).then(res => res.data).catch(error=>error); };
export const YQgetSupplierList = params => { return axios.post(`${base}/ProductOtherController/getSupplierList`, params).then(res => res.data).catch(error=>error); };
export const YQaddSupplierInfo = params => { return axios.post(`${base}/ProductOtherController/addSupplierInfo`, params).then(res => res.data).catch(error=>error); };
export const YQupdateSupplierInfo = params => { return axios.post(`${base}/ProductOtherController/updateSupplierInfo`, params).then(res => res.data).catch(error=>error); };
export const YQdeleteSupplierInfo = params => { return axios.post(`${base}/ProductOtherController/deleteSupplierInfo`, params).then(res => res.data).catch(error=>error); };
export const YQaddCityGroupInfo = params => { return axios.post(`${base}/ProductOtherController/addCityGroupInfo`, params).then(res => res.data).catch(error=>error); };
export const YQgetCityGroupList = params => { return axios.post(`${base}/ProductOtherController/getCityGroupList`, params).then(res => res.data).catch(error=>error); };
export const YQupdateCityGroupInfo = params => { return axios.post(`${base}/ProductOtherController/updateCityGroupInfo`, params).then(res => res.data).catch(error=>error); };
export const YQdeleteCityGroupInfo = params => { return axios.post(`${base}/ProductOtherController/deleteCityGroupInfo`, params).then(res => res.data).catch(error=>error); };
export const YQaddProductInfo = params => { return axios.post(`${base}/productController/addProductInfo`, params).then(res => res.data).catch(error=>error); };
export const YQupdateProductInfo = params => { return axios.post(`${base}/productController/updateProductInfo`, params).then(res => res.data).catch(error=>error); };
export const YQdeleteProductInfo = params => { return axios.post(`${base}/productController/deleteProductInfo`, params).then(res => res.data).catch(error=>error); };
export const YQisDeleteProductInfo = params => { return axios.post(`${base}/productController/isDeleteProductInfo`, params).then(res => res.data).catch(error=>error); };
export const YQgetGroupList = params => { return axios.post(`${base}/userController/getGroupList`, params).then(res => res.data).catch(error=>error); };
export const YQaddOrUpdateSimStockInfo = params => { return axios.post(`${base}/productController/addOrUpdateSimStockInfo`, params).then(res => res.data).catch(error=>error); };
export const YQgetSimStockInfo = params => { return axios.post(`${base}/productController/getSimStockInfo`, params).then(res => res.data).catch(error=>error); };
//库存
export const YQgetStockGoodList = params => { return axios.post(`${base}/productController/getStockGoodList`, params).then(res => res.data).catch(error=>error); };
export const YQgetStockToProductList = params => { return axios.post(`${base}/productController/getStockToProductList`, params).then(res => res.data).catch(error=>error); };
export const YQaddOrUpdateStockInfo = params => { return axios.post(`${base}/productController/addOrUpdateStockInfo`, params).then(res => res.data).catch(error=>error); };
export const YQdeleteStockInfo = params => { return axios.post(`${base}/productController/deleteStockInfo`, params).then(res => res.data).catch(error=>error); };

export const YQsysAddOrderInfo = params => { return axios.post(`${base}/productController/sysAddOrderInfo`, params).then(res => res.data).catch(error=>error); };




//订单

export const queryRoute = params => { return axios.post(`${base}/OrderPartWxController/queryRoute`, params).then(res => res.data).catch(error=>error); };
export const OrderList = params => { return axios.post(`${base}/OrderInfoController/OrderList`, params).then(res => res.data).catch(error=>error); };
export const getHouse = params => { return axios.post(`${base}/OrderPartWxController/getHouse`, params).then(res => res.data).catch(error=>error); };

export const OrderPartWxController = params => { return axios.post(`${base}/OrderPartWxController/partDistributionInfo`, params).then(res => res.data).catch(error=>error); };
export const pistdributionPrint = params => { return axios.post(`${base}/OrderPartWxController/pistdributionPrint`, params).then(res => res.data).catch(error=>error); };
export const distributionRoute = params => { return axios.post(`${base}/OrderPartWxController/distributionRoute`, params).then(res => res.data).catch(error=>error); };

export const preViewInfo = params => { return axios.post(`${base}/OrderPartWxController/preViewInfo`, params).then(res => res.data).catch(error=>error); };

export const partDistribution = params => { return axios.post(`${base}/OrderPartWxController/partDistribution`, params).then(res => res.data).catch(error=>error); };

export const orderDelivery = params => { return axios.post(`${base}/OrderPartWxController/orderDelivery`, params).then(res => res.data).catch(error=>error); };















//let DCSbase = 'http://localhost:8090/kjxytest/dcsApi'
let DCSbase = 'http://116.62.154.216:8090/kjxytest/dcsApi'


export const DCSAddUser = params => { return axios.post(`${DCSbase}/addUser`, params).then(res => res.data).catch(error=>error); };
export const DCSAddUserList = params => { return axios.post(`${DCSbase}/addUserList`, params).then(res => res.data).catch(error=>error); };
export const DCSGetUserRate = params => { return axios.post(`${DCSbase}/getUserRate`, params).then(res => res.data).catch(error=>error); };
export const DCSGetUserRateList = params => { return axios.post(`${DCSbase}/getUserRateList`, params).then(res => res.data).catch(error=>error); };
export const DCSUpdateProjectRate = params => { return axios.post(`${DCSbase}/updateProjectRate`, params).then(res => res.data).catch(error=>error); };
export const DCSUpdateAddRate = params => { return axios.post(`${DCSbase}/updateAddRate`, params).then(res => res.data).catch(error=>error); };
export const DCSUpdateNoStarRate = params => { return axios.post(`${DCSbase}/updateNoStarRate`, params).then(res => res.data).catch(error=>error); };
export const DCSGetUserInfo = params => { return axios.post(`${DCSbase}/getUserInfo`, params).then(res => res.data).catch(error=>error); };
export const DCSSetRoleUser = params => { return axios.post(`${DCSbase}/setRoleUser`, params).then(res => res.data).catch(error=>error); };
export const DCSGetRoleUserList = params => { return axios.post(`${DCSbase}/getRoleUserList`, params).then(res => res.data).catch(error=>error); };
export const DCSSetMonthRate = params => { return axios.post(`${DCSbase}/setMonthRate`, params).then(res => res.data).catch(error=>error); };

export const DCSGetRateLogList = params => { return axios.post(`${DCSbase}/getRateLogList`, params).then(res => res.data).catch(error=>error); };
export const DCSUpdateMonthRate = params => { return axios.post(`${DCSbase}/updateMonthRate`, params).then(res => res.data).catch(error=>error); };
export const DCSRemoveRateLog = params => { return axios.post(`${DCSbase}/removeRateLog`, params).then(res => res.data).catch(error=>error); };

