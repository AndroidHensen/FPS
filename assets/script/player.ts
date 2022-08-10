
import { _decorator, Component, Node, systemEvent, SystemEventType, macro, EventKeyboard, RigidBody, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Player
 * DateTime = Tue Aug 09 2022 16:57:47 GMT+0800 (中国标准时间)
 * Author = 我爱喜洋洋
 * FileBasename = player.ts
 * FileBasenameNoExtension = player
 * URL = db://assets/script/player.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('Player')
export class Player extends Component {

    keyMask = 0

    start() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onDestory() {
        systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.a:
                this.keyMask |= (1 << 0)
                break;
            case macro.KEY.s:
                this.keyMask |= (1 << 1)
                break;
            case macro.KEY.w:
                this.keyMask |= (1 << 2)
                break;
            case macro.KEY.d:
                this.keyMask |= (1 << 3)
                break;
            case macro.KEY.space:
                this.keyMask |= (1 << 4)
                break;
            case macro.KEY.q:
                this.keyMask |= (1 << 5)
                break;
            case macro.KEY.e:
                this.keyMask |= (1 << 6)
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.a:
                this.keyMask &= ~(1 << 0)
                break;
            case macro.KEY.s:
                this.keyMask &= ~(1 << 1)
                break;
            case macro.KEY.w:
                this.keyMask &= ~(1 << 2)
                break;
            case macro.KEY.d:
                this.keyMask &= ~(1 << 3)
                break;
            case macro.KEY.space:
                this.keyMask &= ~(1 << 4)
                break;
            case macro.KEY.q:
                this.keyMask &= ~(1 << 5)
                break;
            case macro.KEY.e:
                this.keyMask &= ~(1 << 6)
                break;
        }
    }

    update(deltaTime: number) {
        let speed = 15
        let jumpSpeed = 5
        let cameraSpeend = 3
        let rb = this.node.getComponent(RigidBody)
        let lv = v3(0, 0, 0)
        rb.getLinearVelocity(lv)

        if (this.keyMask & (1 << 1)) {
            lv.x = 0
            lv.z = speed
        }
        if (this.keyMask & (1 << 2)) {
            lv.x = 0
            lv.z = -speed
        }
        if (this.keyMask & (1 << 3)) {
            lv.x = speed
            lv.z = 0
        }
        if (this.keyMask & (1 << 0)) {
            lv.x = -speed
            lv.z = 0
        }
        if (this.keyMask & (1 << 4)) {
            lv.y = jumpSpeed
            lv.z = 0
        }

        let angle = this.node.eulerAngles

        if (this.keyMask & (1 << 5)) {
            this.node.setRotationFromEuler(v3(angle.x, angle.y + cameraSpeend, angle.z))
        } else if (this.keyMask & (1 << 6)) {
            this.node.setRotationFromEuler(v3(angle.x, angle.y - cameraSpeend, angle.z))
        }

        Vec3.transformQuat(lv, lv, this.node.getRotation())

        if (!this.keyMask) {
            lv.x = 0
            lv.z = 0
        }

        rb.setLinearVelocity(lv)
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
