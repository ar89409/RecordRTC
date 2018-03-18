var media = document.querySelector("video#media");
var btnRecord = document.querySelector("button#btnRecord");
var btnStop = document.querySelector("button#btnStop");

function successCallBack(stream) {
	var arrayOfBlobs = [];
	var config = {
		mimeType: 'audio/ogg',
	};

	var recorder = new MediaRecorder(stream, config);
	console.log(recorder);

	recorder.ondataavailable = function(event) {
		console.log(event.data);
		arrayOfBlobs.push(event.data);
		ConcatenateBlobs(arrayOfBlobs, 'audio/ogg', function(singleBlob) {
			media.src = URL.createObjectURL(singleBlob);
			console.log(arrayOfBlobs);
			console.log(singleBlob);
		});

	};

	btnRecord.onclick = function() {
		recorder.start(2000);
	}

	btnStop.onclick = function() {
		recorder.stop();
	}
}

function errorCallBack(error) {
	console.log("getUserMedia error: " + error);
}

navigator.mediaDevices.getUserMedia({ audio:true }).then(successCallBack).catch(errorCallBack);
