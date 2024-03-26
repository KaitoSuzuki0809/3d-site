<?php
// $post_id = (string)get_post()->ID;
// $main_text = get_post_custom_values('main_text', $post_id)[0];
?>

<!-- css -->
<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/css/3d-style.css' ?>">
<!-- js libraries -->
<script src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/jquery.js' ?>"></script>

<div class="canvas-wrapper">
    <div class="progress-container">
        <div class="progress-bar">
            <span class="progress-guide" id="progressGuide"></span>
            <span class="progress-percent" id="progressPercent"></span>
            <ul class="progress-nav" id="progressNav">
                <li class="li-philosophy"><span><a href="">Philosophy</a></span></li>
                <li class="li-companies"><span><a href="">Companies</a></span></li>
                <li class="li-ceo"><span><a href="">CEO</a></span></li>
                <li class="li-info-contact"><span><a href="">Info<br>Contact</a></span></li>
            </ul>
        </div>
    </div>

    <!-- <canvas id="planets"></canvas> -->
    <canvas id="bloomElement"></canvas>
    <!-- <canvas id="fireElement"></canvas> -->
    <canvas id="particle"></canvas>
    <p class="corp-name TextTyping">株式会社Eureka Holdings</p>
    <div class="philosophy">
        <p class="phil-main">共に創り上げる革命的未来、幸福な共同体の築造</p>
        <div class="phil-sub">
            <p>私たちは、新しいアイディアや解決策の発見、革新、そしてポジティブな未来への期待を込めて挑戦と変革を恐れず未知の領域に挑みます。
                <br><br>いつまでも積極的な探求心を持ち、<span class="marker">独自の視点から問題にアプローチ</span>していくことができます。
            </p>
        </div>
        <div class="images" id="philImages">
            <div class="phil-image-container">
                <img class="phil-image phil-image-1" id="philImage1" src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/images/phil-image-1.png'?>" alt="">
            </div>
            <div class="phil-image-container">
                <img class="phil-image phil-image-2" id="philImage2" src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/images/phil-image-2.png'?>" alt="">
            </div>
            <div class="phil-image-container">
                <img class="phil-image phil-image-3" id="philImage3" src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/images/phil-image-3.png'?>" alt="">
            </div>
            <div class="phil-image-container">
                <img class="phil-image phil-image-4" id="philImage4" src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/images/phil-image-4.png'?>" alt="">
            </div>
        </div>
    </div>
    <div class="scrolldown3"><span>Scroll</span></div>

    <div id="splash"></div>
    <div class="splashbg"></div>

    <div class="group-companies" id="groupCompanies">
        <h2 class="group-companies-h2">Group Companies</h2>
        <div class="grid-container" id="company1">
            <h3 class="corporate-name"><p>株式会社Eureka Holdings</p></h3>
            <div class="strength">
                <h3>強み<span class="en"> Strength</span></h3>
                多様なサービスポートフォリオ: Eureka、Enigma、EDENのグループ企業は、デジタルマーケティング、テクノロジー、ビジネスコンサルティングなど、多様なサービスを提供しています。これにより、顧客の幅広いニーズに対応することが可能です。
                シナジー効果の最大化: 各グループ企業は、相互に連携し、サービスのシナジー効果を最大化します。デジタルマーケティングとテクノロジーの統合、ビジネスコンサルティングと人材開発の連携など、より効果的なソリューションを提供します。
                イノベーションと成長への投資: Eureka Holdingsは、イノベーションと成長を重視し、積極的な投資を行います。新しいテクノロジーやビジネスモデルの探求、新規事業の立ち上げなど、将来のビジネス展開に焦点を当てています。
            </div>
            <div class="about-us">
                <h3>会社概要<span class="en"> About Us</span></h3>
                <p>私たちは、株式会社Eureka、株式会社Enigma、株式会社EDENを束ねる持株会社です。当社は、デジタルマーケティング、テクノロジー、ビジネスコンサルティングなど、多岐にわたる分野で事業展開を行っています。</p>
                <p>私たちのグループ企業は、それぞれ専門性を持ちながらも、共通のビジョンのもとに結集しています。私たちは顧客のニーズに応じた包括的なソリューションを提供し、彼らのビジネス成果を最大化することを使命としています。</p>
            </div>
            <div class="corporate-philosophy">
                <h3>思想 <span class="en">Philosophy</span></h3>
                <p>Eureka Holdingsは、多様なサービスポートフォリオとシナジー効果の最大化を通じて、顧客のビジネス成果を最大化することを使命としています。私たちは常に変化する市場に適応し、顧客と共に成長することを目指しています。</p>
                <p>この概要は、Eureka Holdingsが持つグループ企業の特徴と、顧客への価値提供に焦点を当てています。</p>
            </div>
        </div>

        <div class="grid-container" id="company2">
            <h3 class="corporate-name"><p>株式会社Eureka</p></h3>
            <div class="strength">
                <h3>強み<span class="en"> Strength</span></h3>
                戦略立案とプランニング: ターゲットオーディエンスの特定や競合分析などを含む広告戦略の立案とプランニングを行います。顧客のビジネス目標に合わせた戦略的アプローチを追求し、最適な広告キャンペーンを設計します。
                デジタル広告キャンペーンの実行: Google広告、Meta広告、LINE広告など、主要なデジタル広告プラットフォームだけでなくPinterest、TikTokなどを活用し、ターゲットオーディエンスにリーチするキャンペーンを実行します。効果的な広告クリエイティブやターゲティングを用いて、顧客のビジネス成果を最大化します。
                データ分析と最適化: 広告キャンペーンの成果を定期的に分析し、改善点を見つけ出します。CTR、コンバージョン率、ROIなどの指標を用いて、キャンペーンの効果を評価し、最適化を行います。
                クリエイティブ制作: 魅力的で効果的な広告クリエイティブの制作を行います。ビジュアルやコピーにおいて、ターゲットオーディエンスの心に響くコンテンツを制作し、ブランドの魅力を高めます。
            </div>
            <div class="about-us">
                <h3>会社概要<span class="en"> About Us</span></h3>
                <p>私たちは、デジタルマーケティング全般のサポートを行っています。当社は、顧客のオンラインプレゼンスを強化し、ビジネスの成長を促進するための包括的なソリューションを提供しています。</p>
            </div>
            <div class="corporate-philosophy">
                <h3>思想 <span class="en">Philosophy</span></h3>
                <p>株式会社Eurekaは、デジタルマーケティングのエキスパートとして、顧客のビジネス成果を最大化するために努力します。</p>
                <p>私たちは常に最新のトレンドやテクノロジーに注意を払い、革新的な広告ソリューションを提供します。</p>
            </div>
        </div>

        <div class="grid-container" id="company3">
            <h3 class="corporate-name"><p>株式会社Enigma</p></h3>
            <div class="strength">
                <h3>強み<span class="en"> Strength</span></h3>
                戦略的コンサルティング : ターゲットオーディエンスや業界のトレンドを分析し、戦略立案から始まるコンサルティングサービスを提供します。顧客のニーズに合わせた戦略を策定し、最適なソーシャルメディア戦略を構築します。
                コンテンツ制作と配信 : 顧客のターゲットオーディエンスにリーチするための魅力的なコンテンツを制作し、適切なソーシャルメディアプラットフォームに配信します。ブログ記事、ビデオコンテンツ、インフォグラフィックスなど、幅広いコンテンツ形式に対応します。
                定期的な投稿とスケジュール管理 : タイムリーな情報を提供するための定期的な投稿を行い、投稿スケジュールを管理します。最新のアルゴリズムやトレンドに対応し、顧客のエンゲージメントを促進します。
                エンゲージメントとコミュニケーション : フォロワーや顧客との積極的なコミュニケーションを行い、ブランドとの関係を強化します。コメントへの返信や質問への対応など、エンゲージメントを促進する取り組みを支援します。
                データ分析と改善 : ソーシャルメディアの成果を定期的に分析し、投稿の効果やエンゲージメントのレベルを評価します。そのデータを元に、戦略やコンテンツを改善していきます。
            </div>
            <div class="about-us">
                <h3>会社概要<span class="en"> About Us</span></h3>
                <p>私たちは、ソーシャルメディアアカウントの運用から分析まで一貫したサポートを提供する専門企業です。</p>
                <p>顧客のオンラインプレゼンスを最大限に活用し、ビジネスの成長と成功を促進することに焦点を当てています。</p>
            </div>
            <div class="corporate-philosophy">
                <h3>思想 <span class="en">Philosophy</span></h3>
                <p>株式会社Enigmaは、ソーシャルメディアのプレゼンスを最適化し、顧客のビジネス成果を最大化するためのパートナーとして、お客様の成功を支援します。</p>
            </div>
        </div>

        <div class="grid-container" id="company4">
            <h3 class="corporate-name"><p>株式会社EDEN</p></h3>
            <div class="strength">
                <h3>強み<span class="en"> Strength</span></h3>
                マーケティングのコンサルティング: 顧客のビジネス目標やニーズに合わせたマーケティング戦略の策定を支援します。市場分析、競合調査、ターゲットオーディエンスの特定など、成功に向けた戦略を共に立案します。
                人事組織コンサルティング: 効果的な組織構造や人材戦略の策定を支援し、組織のパフォーマンス向上を目指します。採用プロセスの改善、人材育成プログラムの導入など、人材管理の最適化をサポートします。
                営業支援: 効果的な営業戦略やプロセスの構築を支援し、顧客獲得や売上拡大を促進します。営業チームのトレーニングやリーダーシップ開発、顧客アプローチの改善など、営業力の強化をサポートします。
                新規事業の積極的展開: 新しいビジネスアイデアやスタートアップ企業に対して、投資やコンサルティングを行い、彼らの成長と成功を支援します。市場調査、ビジネスプランの策定、資金調達の支援など、新規事業の立ち上げを支援します。
            </div>
            <div class="about-us">
                <h3>会社概要<span class="en"> About Us</span></h3>
                <p>私たちは、マーケティングのコンサルティング、人事組織コンサルティング、営業支援、および新規事業の積極的な展開を行う、総合的なサービス企業です。私たちは、顧客のビジネス成長と成功を促進するための包括的なソリューションを提供しています。</p>
            </div>
            <div class="corporate-philosophy">
                <h3>思想 <span class="en">Philosophy</span></h3>
                <p>株式会社EDENは、顧客のビジネスにイノベーションと成長をもたらすパートナーとして、積極的なサポートを提供します。私たちは、ビジネスのニーズに応じたカスタマイズされたソリューションを提供し、顧客の成功を共に築いていくことを使命としています。</p>
                <p>この概要は、EDENが提供する多岐にわたるサービスと、顧客のビジネス成長を促進する取り組みを明確に伝えるものです。</p>
            </div>
        </div>
    </div>

    <div id="splash-2"></div>
    <div class="splashbg-2"></div>

    <div class="ceo-introduction"  id="ceoIntroduction">
        <h2>CEO Introduction</h2>
        <div class="ceo-grid-container">
            <img src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/images/ceo_sample.jpg' ?>" alt="">
            <div class="text-container">
                <h3>佐藤 公一 <span>Kouichi Sato</span></h3>
                <p>text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text </p>
            </div>
        </div>
    </div>

    <div class="info-contact" id="infoContact">
        <div class="information">
            <h2>Information</h2>
            <table class="info-table">
                <tbody>
                    <tr>
                        <th>社名</th>
                        <td>株式会社Eureka Holdings</td>
                    </tr>
                    <tr>
                        <th>所在地</th>
                        <td>〒106-0031　東京都港区西麻布四丁目18番25号</td>
                    </tr>
                    <tr>
                        <th>代表</th>
                        <td>佐藤 公一</td>
                    </tr>
                    <tr>
                        <th>資本金</th>
                        <td>1,000万円</td>
                    </tr>
                    <tr>
                        <th>事業内容</th>
                        <td>デジタルマーケティング事業全般、マーケティングコンサルティング、人事組織コンサルティング、営業支援、SNSアカウント運用事業</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="contact">
            <h2>Contact</h2>
            <form action="mail.php" action="POST" class="form">
                <div class="row">
                    <label for="name" class="label-name">お名前</label>
                    <input type="text" id="name" name="name" class="name">
                </div>

                <div class="row">
                    <label for="email" class="label-email">メールアドレス</label>
                    <input type="email" id="email" name="email" class="email">
                </div>

                <div class="row">
                    <label for="contactMessage" class="label-contact-message">お問い合わせ内容</label>
                    <textarea name="contact_message" id="contactMessage" class="contact-message" cols="30" rows="10"></textarea>
                </div>

                <div class="submit-btn">
                    <button type="submit">送信</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- js -->
<script>
    const imagePath = "<?php echo get_stylesheet_directory_uri() . '/_g3/assets/images/' ?>";
</script>
<script src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/top.js' ?>"></script>
<script type="module" src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/bloomLight.js' ?>"></script>
<!-- <script type="module" src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/fire.js' ?>"></script> -->
<script type="module" src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/fluid_animation.js' ?>"></script>
