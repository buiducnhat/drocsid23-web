import {createSlice} from "@reduxjs/toolkit";

const channelSettingSlice = createSlice({
  name:'channelSetting',
  initialState:{status: 'idle' ,channelSetting: [] },
  reducers:{},
})

export default channelSettingSlice;
