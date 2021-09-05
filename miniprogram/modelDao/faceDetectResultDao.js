import {FaceDetectResult} from "../model/faceDetectResult"

class FaceDetectResultDao {
  static testFaceDetectResult() {
    const faceDetectResult = new FaceDetectResult()
    faceDetectResult.id = null
    faceDetectResult.openid = "oFe394uPpeyXXMRUCwU_MZ7yO5aw"
    faceDetectResult.age = 30
    faceDetectResult.beauty = 64
    faceDetectResult.emotion = {'probability': 0.9996923208236694, 'type': 0}
    faceDetectResult.eye = {
      'eyeOpen': {'probability': 0.9996923208236694, 'type': 0},
      'eyeSize': {'probability': 0.9996923208236694, 'type': 0},
      'eyelidType': {'probability': 0.9996923208236694, 'type': 0},
      'glass': {'probability': 0.9996923208236694, 'type': 0}
    }
    faceDetectResult.eyebrow = {
      'eyebrowDensity': {'probability': 0.9996923208236694, 'type': 0},
      'eyebrowCurve': {'probability': 0.9996923208236694, 'type': 0},
      'eyebrowLength': {'probability': 0.9996923208236694, 'type': 0}
    }
    faceDetectResult.gender = {'probability': 0.9996923208236694, 'type': 0}
    faceDetectResult.hair = {
      'bang': {'probability': 0.9996923208236694, 'type': 0},
      'color': {'probability': 0.9996923208236694, 'type': 0},
      'length': {'probability': 0.9996923208236694, 'type': 0}
    }
    faceDetectResult.hat = {
      'color': {'probability': 0.9996923208236694, 'type': 0},
      'style': {'probability': 0.9996923208236694, 'type': 0}
    }
    faceDetectResult.headPose = {
      'pitch': {'probability': 0.9996923208236694, 'type': 0},
      'yaw': {'probability': 0.9996923208236694, 'type': 0},
      'roll': {'probability': 0.9996923208236694, 'type': 0}
    }
    faceDetectResult.mask = {'probability': 0.9996923208236694, 'type': 0}
    faceDetectResult.moustache = {'probability': 0.9996923208236694, 'type': 0}
    faceDetectResult.mouth = {'mouthOpen': {'probability': 0.9996923208236694, 'type': 0}}
    faceDetectResult.nose = {'probability': 0.9996923208236694, 'type': 0}
    faceDetectResult.shape = {'probability': 0.9996923208236694, 'type': 0}
    faceDetectResult.skin = {'probability': 0.9996923208236694, 'type': 0}
    faceDetectResult.smile = 30
    faceDetectResult.requestId = "8d99f07a-b7bb-4de1-81b0-d6541aa72975"

    console.log(faceDetectResult)
  }
}

export {
  FaceDetectResultDao
}
