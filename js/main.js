// counterUp 計數動畫工具
const counterUp = window.counterUp.default;

const callback = entries => {
    entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting && !el.classList.contains('is-visible')) {
            counterUp(el, {
                duration: 2000,
                delay: 16,
            });
            el.classList.add('is-visible');
        }
    });
};

// 視窗門檻：建議設 0.3 或 0.5 比較好觸發，設 1 必須整張卡片完全露出來
const IO = new IntersectionObserver(callback, { threshold: 0.3 });

// 批次選取所有帶有 .counter 的數字元素進行監聽
const counterElements = document.querySelectorAll('.counter');
counterElements.forEach(el => {
    IO.observe(el);
});

// S08 兩階段情境結局資料庫
const scenarioResults = {
    1: {
        A: {
            tag: "階段一結局 A：真空效應與收容壓力",
            badgeBg: "bg-warning text-dark",
            title: "看似解決眼前問題，卻陷入循環陷阱",
            desc: "母貓被移走後，該巷弄釋出了食物與生存空間。數週後，鄰近區域未絕育的其他浪貓迅速移入（真空效應），且幼貓在收容所面臨極高高壓與感染風險，社區問題並未真正解決。",
            icon: "fa-triangle-exclamation"
        },
        B: {
            tag: "階段一結局 B：族群大爆發與社區對立",
            badgeBg: "bg-danger text-white",
            title: "愛心無絕育，半年後數量翻倍",
            desc: "僅餵食不絕育導致母貓在半年內再次懷孕生產，原本的三隻小貓長大後也加入繁殖。一年後後巷貓咪暴增至十幾隻，引發環境髒亂與居民嚴重對立衝突。",
            icon: "fa-circle-xmark"
        },
        C: {
            tag: "階段一過關：邁向理想社區的第一步！",
            badgeBg: "bg-success text-white",
            title: "明智的抉擇！解鎖第二階段挑戰",
            desc: "母貓完成 TNVR 後剪耳原處回置，有效守住地盤阻止外來貓移入；三隻幼貓通過社會化成功進入家庭。不過，社區的考驗還沒結束……請向下查看第二階段挑戰！",
            icon: "fa-circle-check",
            hasNextStage: true
        }
    },
    // 階段二結局
    2: {
        A: {
            tag: "階段二結局 A：對立激化",
            badgeBg: "bg-danger text-white",
            title: "溝通破裂，浪浪成為鄰里衝突犧牲品",
            desc: "情緒化的爭辯無法解決環境衛生疑慮，反而讓管委會對浪貓產生極大反感，甚至私下通報捕捉，前功盡棄。",
            icon: "fa-circle-xmark"
        },
        B: {
            tag: "階段二結局 B：完美共融的模範社區 (最終大獎)",
            badgeBg: "bg-success text-white",
            title: "實踐「乾淨餵養」，建立永續人貓共處機制",
            desc: "透過理性溝通與落實「定點定時、餵完清理、絕育不放縱」，張伯伯不僅卸下戒心，還主動加入志工行列。你的明智抉擇，讓這個巷弄成為人與動物最溫柔的共融典範！",
            icon: "fa-award"
        },
        C: {
            tag: "階段二結局 C：消極撤守與隱性危機",
            badgeBg: "bg-warning text-dark",
            title: "選擇避開衝突，卻失去了凝聚共識的機會",
            desc: "撤走餵養點雖然暫時平息了伯伯的抱怨，但飢餓的浪貓開始翻找其他住戶的垃圾桶，造成環境二次汙染，鄰里對浪貓的觀感也陷入長期冷漠與不信任。",
            icon: "fa-triangle-exclamation"
        }
    }
};

function selectChoice(stage, option, element) {
    const $result1 = $('#s08-result-1');
    const $result2 = $('#s08-result-2');
    const $stage2 = $('#s08-stage-2');

    // ==========================================
    // 階段一選擇
    // ==========================================
    if (stage === 1) {
        // 1. 高亮設定
        $('#s08 .s08-choice-card').removeClass('active');
        $(element).addClass('active');

        // 2. 每次重新選擇第一階段時，先重置/隱藏第二階段與結局二
        $('#s08 .s08-choice-card-2').removeClass('active');
        $stage2.addClass('d-none');
        $result2.addClass('d-none');

        // 3. 組合結局一內容
        const data = scenarioResults[1][option];
        const htmlContent = `
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <span class="badge ${data.badgeBg} px-3 py-2 rounded-pill fw-bold">${data.tag}</span>
                            </div>
                            <h3 class="h4 fw-bold mb-3 text-white"><i class="fa-solid ${data.icon} me-2"></i>${data.title}</h3>
                            <p class="lh-lg text-white-50 mb-0">${data.desc}</p>
                            `;

        // 4. 顯示結局一面板並播放動畫
        $result1.removeClass('d-none animate__animated animate__zoomIn animate__zoomIn').html(htmlContent);
        if ($result1.length > 0) { void $result1[0].offsetWidth; }
        $result1.addClass('animate__animated animate__zoomIn');

        // 5. 判斷 A/B 還是 C
        if (data.hasNextStage) {
            // 選 C：展開第二階段
            $stage2.removeClass('d-none');
        } 
    }

    // ==========================================
    // 階段二選擇
    // ==========================================
    else if (stage === 2) {
        // 1. 高亮設定
        $('#s08 .s08-choice-card-2').removeClass('active');
        $(element).addClass('active');

        // 2. 組合結局二內容
        const data = scenarioResults[2][option];
        const htmlContent = `
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <span class="badge ${data.badgeBg} px-3 py-2 rounded-pill fw-bold">${data.tag}</span>
                            </div>
                            <h3 class="h4 fw-bold mb-3 text-white"><i class="fa-solid ${data.icon} me-2"></i>${data.title}</h3>
                            <p class="lh-lg text-white-50 mb-0">${data.desc}</p>
                            `;

        // 3. 顯示結局二面板並播放動畫
        $result2.removeClass('d-none animate__animated animate__zoomIn animate__zoomIn').html(htmlContent);
        if ($result2.length > 0) { void $result2[0].offsetWidth; }
        $result2.addClass('animate__animated animate__zoomIn');
    }
}