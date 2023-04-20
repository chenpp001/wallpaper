interface audio {
    src: string;
    title: string;
    singer: string;
    coverImgUrl: string;
}
interface audioInfo extends audio {
    current: string;
    duration: string;
    duration_value: number;
    current_value: number;
}
declare enum zaudioCbName {
    onWaiting = "waiting",
    onError = "error",
    onTimeUpdate = "playing",
    onCanplay = "canPlay",
    onPause = "pause",
    onEnded = "ended",
    setAudio = "setAudio",
    updateAudio = "updateAudio",
    seek = "seek",
    onStop = "stop",
    syncStateOn = "syncStateOn"
}
import { EventBus } from "./util";
/**
 * ZAudio类
 * @class ZAudio
 * @constructor
 * @param    {String}    defaultCover    音频默认封面
 * @param    {Boolean}   continuePlay    继续播放,错误播放或结束播放后执行
 * @param    {Boolean}   autoPlay        自动播放,部分浏览器不支持
 * @property {Number}         renderIndex     当前渲染索引
 * @property {<audioinfo>}      renderinfo      当前渲染数据
 * @property {Array<audio>}   audiolist       音频列表数组
 * @property {<audioinfo>}      playinfo        当前播放数据
 * @property {Boolean}        paused          音频暂停状态
 * @property {Number}         playIndex       当前播放索引
 * @property {Boolean}        renderIsPlay    渲染与播放是否一致
 *
 * @method on(event, action, fn)       回调函数注册业务事件
 * @method off(event, action)          回调函数中卸载业务事件
 * @method setRender(data)             指定音频, 渲染到zaudio组件
 * @method syncRender()    						 同步并渲染当前的播放状态
 * @method operate(index)       			 播放或暂停指定索引的音频
 * @method setAudio(list)		   				 覆盖音频列表
 * @method updateAudio(list)   				 添加音频列表
 * @method stop()          						 强制暂停当前播放音频
 * @method stepPlay(count)      				快进快退
 * @method syncStateOn(action, cb)       	注册一个用于同步获取当前播放状态的事件
 * @method syncStateOff(action)     		卸载用于同步获取当前播放状态的事件
 *
 *
 * **/
export default class ZAudio extends EventBus {
    static version: string;
    loading: boolean;
    renderIndex: number;
    audiolist: Array<audio>;
    renderinfo: audioInfo;
    playinfo: audioInfo;
    paused: boolean;
    uPause: boolean;
    audioCtx: any;
    autoPlay: boolean;
    defaultCover: string;
    continuePlay: boolean;
    constructor(options: {
        defaultCover: string;
        autoPlay: boolean;
        continuePlay: boolean;
    });
    private init;
    checkEventParams(event: zaudioCbName, action: string | symbol, fn?: () => {}): boolean;
    /**
     * @description 回调中卸载业务事件
     * @param {<zaudioCbName>}   event     回调名称枚举值
     * @param {Sting|Symbol}         action    业务函数名,用于区分不同业务
     * @returns undefined
     * **/
    off(event: zaudioCbName, action: string | symbol): void;
    /**
     * @description 回调中注册业务事件
     * @param {<zaudioCbName>}        event     回调名称枚举值
     * @param {Sting|Symbol}              action    业务函数名,用于区分不同业务
     * @param {function(object|string|number|undefined):undefined}      fn      业务函数, 参数或为音频状态
     * @returns undefined
     * **/
    on(event: zaudioCbName, action: string | symbol, fn: () => {}): void;
    /**
     * @description 订阅触发音频回调
     * @param {<zaudioCbName>}        event      回调名称枚举值,具体看zaudioCbName
     * @param {object|string|number|undefined}     data        订阅触发回调时,传的音频属性
     * @returns undefined
     * **/
    emit(event: zaudioCbName, data?: any): void;
    private commit;
    private onWaitingHandler;
    private onCanplayHandler;
    private onPlayHandler;
    private onPauseHandler;
    private onStopHandler;
    private onEndedHandler;
    private throttlePlaying;
    private onTimeUpdateHandler;
    private onErrorHandler;
    /**
     * @description 实时渲染当前状态
     * @returns undefined
     * **/
    syncRender(): void;
    /**
     * @description 注册一个实时获取ZAudio属性的方法
     * @param {String}        action      自定义业务名
     * @param {Funtion}     fn        实时获取ZAudio属性回调
     * @returns undefined
     * **/
    syncStateOn(action: string, fn: () => {}): void;
    /**
     * @description 卸载实时获取ZAudio属性的方法
     * @param {String}        action      自定义业务名
     * @returns undefined
     * **/
    syncStateOff(action: string): void;
    /**
     * @description 订阅实时获取ZAudio属性的方法
     * @returns undefined
     * **/
    private syncStateEmit;
    /**
     * @description 跳转播放
     * @param {Number}        value      跳转位置
     * @returns undefined
     * **/
    seek(value: number): void;
    /**
     * @description 快进
     * @param {Number}        value      跳转位置
     * @returns undefined
     * **/
    stepPlay(value: number): void;
    /**
     * @description 获取下一首歌曲索引(用于渲染和播放)
     * @param {Number}        count     切换数量
     * @returns number
     * **/
    private getNextKey;
    /**
     * @description 切歌
     * @param {Number}        count      数量
     * @returns undefined
     * **/
    changeplay(count: number): void;
    /**
     * @description 手动播放或暂停, 并渲染对应的数据
     * @param {Number|String|<audioInfo>|undefined}        key      索引或音频对象
     * @returns undefined
     * **/
    operate(key?: number | string | audioInfo): void;
    /**
     * @description 强制暂停播放
     * @returns undefined
     * **/
    stop(): void;
    private operation;
    /**
     * @description 覆盖音频
     * @param {Array<audio>} data 音频数组
     * @returns undefined
     * **/
    setAudio(data: Array<audio>): void;
    /**
     * @description 添加音频
     * @param {Array<audio>} data 音频数组
     * @returns undefined
     * **/
    updateAudio(data: Array<audio>): void;
    /**
     * @description 设置当前播放信息
     * @param {<audioInfo>} data 音频对象
     * @returns undefined
     * **/
    setPlayinfo<T extends keyof audioInfo>(data: audioInfo): void;
    /**
     * @description 设置暂停状态
     * @param {boolean} data 布尔值
     * @returns undefined
     * **/
    setPause(data: boolean): void;
    /**
     * @description 设置loading
     * @param {boolean} data 布尔值
     * @returns undefined
     * **/
    setLoading(data: boolean): void;
    /**
     * @description 设置通话时暂停状态
     * @param {boolean} data 布尔值
     * @returns undefined
     * **/
    setUnnormalPause(data: boolean): void;
    /**
     * @description 设置渲染
     * @param {number | string | audioInfo} data 索引或渲染信息
     * @returns undefined
     * **/
    setRender(data: number | string | audioInfo): void;
    get playIndex(): number;
    get renderIsPlay(): boolean;
    private appCheckReplay;
}
export {};
