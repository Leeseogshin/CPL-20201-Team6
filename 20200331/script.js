const slider = document.getElementById("slider");
const myVideo = document.getElementById("myVideo");
let i;
let source;
let stream = [];
let videoLength;
let currentBlock;
let block = [];


function preProcess()
{
    slider.value = 0;
    currentBlock = 0;
    stream.length = source.speechData[0].response.results[0].alternatives[0].words.length;
    for (i = 0; i < source.speechData[0].response.results[0].alternatives[0].words.length; ++i)
    {
        stream[i] = {
            startTime: source.speechData[0].response.results[0].alternatives[0].words[i].startTime.slice(0, -1) * 1,
            endTime: source.speechData[0].response.results[0].alternatives[0].words[i].endTime.slice(0, -1) * 1,
            duration: source.speechData[0].response.results[0].alternatives[0].words[i].endTime.slice(0, -1) * 1 - source.speechData[0].response.results[0].alternatives[0].words[i].startTime.slice(0, -1) * 1,
            isValid: true
        };
    }
    init();
}

function videoLengthInit()
{
    let i;
    videoLength = 0;
    slider.min = 0;
    block.length = stream.length;
    block[0] = 0;
    for (i = 0; i < stream.length; ++i)
        if (stream[i].isValid)
        {
            videoLength += stream[i].duration;
            if (i != stream.length - 1)
                block[i + 1] = block[i] + stream[i].duration;
        }
        else if (i != stream.length - 1)
            block[i + 1] = block[i];
    slider.max = videoLength;
}

function updateSlider(p)
{
    let i;
    let now = 0;
    p *= 1;
    for (i = 0; i < stream.length; ++i)
        if (stream[i].isValid)
        {
            if (p <= stream[i].duration)
            {
                currentBlock = i;
                now = p + stream[i].startTime;
                myVideo.currentTime = now;
                break;
            }
            p -= stream[i].duration;
        }
}

function init()
{
    updateSlider();
    videoLengthInit();
}

function onPlay()
{
    let numStart = 0;
    let numEnd = 0;
    cur = setInterval(() =>
    {
        if (!stream[currentBlock].isValid)
        {
            if (currentBlock + 1 >= stream.length)
            {
                videoStop();
                return;
            }
            ++currentBlock;
            myVideo.currentTime = stream[currentBlock].startTime;
            return;
        }
        else if (stream[currentBlock].endTime <= myVideo.currentTime)
            if (currentBlock + 1 >= stream.length)
            {
                videoStop();
                return;
            }
            else 
            {
                ++currentBlock;
                if (stream[currentBlock - 1].endTime != stream[currentBlock].startTime)
                    myVideo.currentTime = stream[currentBlock].startTime;
            }
        else
        {
            slider.value = block[currentBlock] + myVideo.currentTime - stream[currentBlock].startTime;
            if (slider.value * 1 >= slider.max * 1)
                videoStop();
        }
    }, 10);
}

function onPause()
{
    clearInterval(cur);
}

function videoPlayPause()
{
    if (myVideo.paused)
        myVideo.play();
    else
        myVideo.pause();
}

function videoStop()
{
    myVideo.pause();
    currentBlock = 0;
    slider.value = 0;
    myVideo.currentTime = 0;
    clearInterval(cur);
}

function dropHandler(ev)
{
    ev.preventDefault();
    if (ev.dataTransfer.items)
    {
        if (ev.dataTransfer.items.length > 1)
        {
            alert("하나만");
            return;
        }
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[0].kind === 'file')
        {
            blob = ev.dataTransfer.items[0].getAsFile();
            if (blob.type.substring(0, 5) === "video")
                console.log(blob.type.substring(0, 5))
            myVideo = blob;
        }
    }
    else
    {
        if (ev.dataTransfer.files.length > 1)
        {
            alert("하나만");
            return;
        }
        blob = ev.dataTransfer.files[0];
        console.log(blob.type)
    }
}

function dragOverHandler(ev)
{
    ev.preventDefault();
}


source = {
    "status": "ok!",
    "user": {
        "uid": "FTllieCREkh9LTHbKIWuQD67lKo1",
        "email": "sinsky1@naver.com"
    },
    "speechRes": [
        {
            "time": "2020-01-10T15:17:31+09:00",
            "speech_name": "861235753057941076"
        }
    ],
    "name": "8b57f1383f071d302a35a5e4812aeaf7",
    "speechData": [
        {
            "name": "861235753057941076",
            "metadata": {
                "@type": "type.googleapis.com\/google.cloud.speech.v1p1beta1.LongRunningRecognizeMetadata",
                "progressPercent": 100,
                "startTime": "2020-01-10T06:17:31.014079Z",
                "lastUpdateTime": "2020-01-10T06:17:42.441891Z"
            },
            "done": true,
            "response": {
                "@type": "type.googleapis.com\/google.cloud.speech.v1p1beta1.LongRunningRecognizeResponse",
                "results": [
                    {
                        "alternatives": [
                            {
                                "transcript": "번역 못 하지만 구글의 인공지능 번역 엔진을 사용을 해서 축하 앱을 만든 다음에 가운데 구글에 엔진을 넣어서 스피치 투 스피치 번역이 되면은 순식간에 고용 하지 않아도 나는 얼마든지 고급스러운 그런 회화 학원 영어 그거 제공할 수 있다 아니면은 그 어플리케이션 하나 만들어 놓으면은 5만 원으로 만들어본다 그럼 여러분들이 구글의 인공지능 번역 인증을 통해서 통역이 되는 모든 유튜브 영상을 언어와 상관없이 항구",
                                "confidence": 0.90789497,
                                "words": [
                                    {
                                        "startTime": "0s",
                                        "endTime": "3.20s",
                                        "word": "번역"
                                    },
                                    {
                                        "startTime": "3.20s",
                                        "endTime": "6.50s",
                                        "word": "못"
                                    },
                                    {
                                        "startTime": "1.50s",
                                        "endTime": "2.30s",
                                        "word": "하지만"
                                    },
                                    {
                                        "startTime": "6.50s",
                                        "endTime": "10.00s",
                                        "word": "하지만"
                                    }
                                ]
                            }
                        ],
                        "languageCode": "ko-kr"
                    }
                ]
            }
        }
    ],
    "uploadRes": [
        {
            "mediaLink": "https:\/\/storage.googleapis.com\/download\/storage\/v1\/b\/aitube_bucket\/o\/8b57f1383f071d302a35a5e4812aeaf7.000.mp3?generation=1578637050426182&alt=media",
            "timeCreated": "2020-01-10T06:17:30.426Z"
        }
    ],
    "file": {
        "originalname": "temp_sound311400262.mp3",
        "upload_time": "2020-01-10T15:17:28+09:00",
        "path": "\/www\/uploads\/8b57f1383f071d302a35a5e4812aeaf7",
        "number": 1
    }
}
preProcess();