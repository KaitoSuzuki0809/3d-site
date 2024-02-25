<?php
// $post_id = (string)get_post()->ID;
// $main_text = get_post_custom_values('main_text', $post_id)[0];
?>

<!-- css -->
<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/css/3d-style.css' ?>">
<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/css/vegas.min.css' ?>">
<!-- js libraries -->
<script src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/jquery.js' ?>"></script>
<script src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/lib/vegas.min.js' ?>"></script>
<script src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/lib/gsap.min.js' ?>"></script>
<script src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/lib/hover-effect-master/dist/hover.umd.js' ?>"></script>

<div class="canvas-wrapper">
    <div id="slider"></div>
    <!-- <canvas id="planets"></canvas> -->
    <canvas id="particle"></canvas>
    <p class="corp-name TextTyping">株式会社Eureka Holdings</p>
    <div class="scrolldown3"><span>Scroll</span></div>
</div>

<div class="text-contents">
    <div class="bg-card"></div>
    <div class="philosophy">
        <p class="phil-main">共に創り上げる革命的未来、幸福な共同体の築造</p>
        <p class="phil-sub">
            私たちは、新しいアイディアや解決策の発見、革新、そしてポジティブな未来への期待を込めて挑戦と変革を恐れず未知の領域に挑みます。
            いつまでも積極的な探求心を持ち、<span class="marker">独自の視点から問題にアプローチ</span>していくことができます。<br><br>
            革新的なアイディアと洞察によって未来の可能性を切り拓き、単なるビジネスの成功だけではなく、<span class="marker">共に歩む人々の幸福と繁栄に深く根ざしています。</span>
        </p>
    </div>
</div>

<div class="group-companies">
    <h2 class="group-companies-h2">Group Companies</h2>
    <div class="grid-container-left">
        <div class="corporate-details">
            <h3 class="name">株式会社Eureka Holdings</h3>
            <div class="about-us">
                <h3>会社概要 <span class="en">About Us</span></h3>
                <p>私たちは、株式会社Eureka、株式会社Enigma、株式会社EDENを束ねる持株会社です。当社は、デジタルマーケティング、テクノロジー、ビジネスコンサルティングなど、多岐にわたる分野で事業展開を行っています。</p>
                <p>私たちのグループ企業は、それぞれ専門性を持ちながらも、共通のビジョンのもとに結集しています。私たちは顧客のニーズに応じた包括的なソリューションを提供し、彼らのビジネス成果を最大化することを使命としています。</p>
            </div>
            <div class="Strengths">
                <h3>強み<span class="en"> Strengths</span></h3>
                多様なサービスポートフォリオ: Eureka、Enigma、EDENのグループ企業は、デジタルマーケティング、テクノロジー、ビジネスコンサルティングなど、多様なサービスを提供しています。これにより、顧客の幅広いニーズに対応することが可能です。
                シナジー効果の最大化: 各グループ企業は、相互に連携し、サービスのシナジー効果を最大化します。デジタルマーケティングとテクノロジーの統合、ビジネスコンサルティングと人材開発の連携など、より効果的なソリューションを提供します。
                イノベーションと成長への投資: Eureka Holdingsは、イノベーションと成長を重視し、積極的な投資を行います。新しいテクノロジーやビジネスモデルの探求、新規事業の立ち上げなど、将来のビジネス展開に焦点を当てています。
            </div>
            <div class="corporate-philosophy">
                <h3>思想 <span class="en">Philosophy</span></h3>
                <p>Eureka Holdingsは、多様なサービスポートフォリオとシナジー効果の最大化を通じて、顧客のビジネス成果を最大化することを使命としています。私たちは常に変化する市場に適応し、顧客と共に成長することを目指しています。</p>
                <p>この概要は、Eureka Holdingsが持つグループ企業の特徴と、顧客への価値提供に焦点を当てています。</p>
            </div>
        </div>
        <div class="corporate-image"></div>
    </div>

    <div class="grid-container-right">
        <div class="corporate-details">
            <h3 class="name">株式会社Eureka Holdings</h3>
            <div class="about-us">
                <h3>会社概要 <span class="en">About Us</span></h3>
                <p>私たちは、株式会社Eureka、株式会社Enigma、株式会社EDENを束ねる持株会社です。当社は、デジタルマーケティング、テクノロジー、ビジネスコンサルティングなど、多岐にわたる分野で事業展開を行っています。</p>
                <p>私たちのグループ企業は、それぞれ専門性を持ちながらも、共通のビジョンのもとに結集しています。私たちは顧客のニーズに応じた包括的なソリューションを提供し、彼らのビジネス成果を最大化することを使命としています。</p>
            </div>
            <div class="Strengths">
                <h3>強み<span class="en"> Strengths</span></h3>
                多様なサービスポートフォリオ: Eureka、Enigma、EDENのグループ企業は、デジタルマーケティング、テクノロジー、ビジネスコンサルティングなど、多様なサービスを提供しています。これにより、顧客の幅広いニーズに対応することが可能です。
                シナジー効果の最大化: 各グループ企業は、相互に連携し、サービスのシナジー効果を最大化します。デジタルマーケティングとテクノロジーの統合、ビジネスコンサルティングと人材開発の連携など、より効果的なソリューションを提供します。
                イノベーションと成長への投資: Eureka Holdingsは、イノベーションと成長を重視し、積極的な投資を行います。新しいテクノロジーやビジネスモデルの探求、新規事業の立ち上げなど、将来のビジネス展開に焦点を当てています。
            </div>
            <div class="corporate-philosophy">
                <h3>思想 <span class="en">Philosophy</span></h3>
                <p>Eureka Holdingsは、多様なサービスポートフォリオとシナジー効果の最大化を通じて、顧客のビジネス成果を最大化することを使命としています。私たちは常に変化する市場に適応し、顧客と共に成長することを目指しています。</p>
                <p>この概要は、Eureka Holdingsが持つグループ企業の特徴と、顧客への価値提供に焦点を当てています。</p>
            </div>
        </div>
        <div class="corporate-image"></div>
    </div>

    <div class="grid-container-left">
        <div class="corporate-details">
            <h3 class="name">株式会社Eureka Holdings</h3>
            <div class="about-us">
                <h3>会社概要 <span class="en">About Us</span></h3>
                <p>私たちは、株式会社Eureka、株式会社Enigma、株式会社EDENを束ねる持株会社です。当社は、デジタルマーケティング、テクノロジー、ビジネスコンサルティングなど、多岐にわたる分野で事業展開を行っています。</p>
                <p>私たちのグループ企業は、それぞれ専門性を持ちながらも、共通のビジョンのもとに結集しています。私たちは顧客のニーズに応じた包括的なソリューションを提供し、彼らのビジネス成果を最大化することを使命としています。</p>
            </div>
            <div class="Strengths">
                <h3>強み<span class="en"> Strengths</span></h3>
                多様なサービスポートフォリオ: Eureka、Enigma、EDENのグループ企業は、デジタルマーケティング、テクノロジー、ビジネスコンサルティングなど、多様なサービスを提供しています。これにより、顧客の幅広いニーズに対応することが可能です。
                シナジー効果の最大化: 各グループ企業は、相互に連携し、サービスのシナジー効果を最大化します。デジタルマーケティングとテクノロジーの統合、ビジネスコンサルティングと人材開発の連携など、より効果的なソリューションを提供します。
                イノベーションと成長への投資: Eureka Holdingsは、イノベーションと成長を重視し、積極的な投資を行います。新しいテクノロジーやビジネスモデルの探求、新規事業の立ち上げなど、将来のビジネス展開に焦点を当てています。
            </div>
            <div class="corporate-philosophy">
                <h3>思想 <span class="en">Philosophy</span></h3>
                <p>Eureka Holdingsは、多様なサービスポートフォリオとシナジー効果の最大化を通じて、顧客のビジネス成果を最大化することを使命としています。私たちは常に変化する市場に適応し、顧客と共に成長することを目指しています。</p>
                <p>この概要は、Eureka Holdingsが持つグループ企業の特徴と、顧客への価値提供に焦点を当てています。</p>
            </div>
        </div>
        <div class="corporate-image"></div>
    </div>

    <div class="grid-container-right">
        <div class="corporate-details">

            <h3 class="name">株式会社Eureka Holdings</h3>
            <div class="about-us">
                <h3>会社概要 <span class="en">About Us</span></h3>
                <p>私たちは、株式会社Eureka、株式会社Enigma、株式会社EDENを束ねる持株会社です。当社は、デジタルマーケティング、テクノロジー、ビジネスコンサルティングなど、多岐にわたる分野で事業展開を行っています。</p>
                <p>私たちのグループ企業は、それぞれ専門性を持ちながらも、共通のビジョンのもとに結集しています。私たちは顧客のニーズに応じた包括的なソリューションを提供し、彼らのビジネス成果を最大化することを使命としています。</p>
            </div>
            <div class="Strengths">
                <h3>強み<span class="en"> Strengths</span></h3>
                多様なサービスポートフォリオ: Eureka、Enigma、EDENのグループ企業は、デジタルマーケティング、テクノロジー、ビジネスコンサルティングなど、多様なサービスを提供しています。これにより、顧客の幅広いニーズに対応することが可能です。
                シナジー効果の最大化: 各グループ企業は、相互に連携し、サービスのシナジー効果を最大化します。デジタルマーケティングとテクノロジーの統合、ビジネスコンサルティングと人材開発の連携など、より効果的なソリューションを提供します。
                イノベーションと成長への投資: Eureka Holdingsは、イノベーションと成長を重視し、積極的な投資を行います。新しいテクノロジーやビジネスモデルの探求、新規事業の立ち上げなど、将来のビジネス展開に焦点を当てています。
            </div>
            <div class="corporate-philosophy">
                <h3>思想 <span class="en">Philosophy</span></h3>
                <p>Eureka Holdingsは、多様なサービスポートフォリオとシナジー効果の最大化を通じて、顧客のビジネス成果を最大化することを使命としています。私たちは常に変化する市場に適応し、顧客と共に成長することを目指しています。</p>
                <p>この概要は、Eureka Holdingsが持つグループ企業の特徴と、顧客への価値提供に焦点を当てています。</p>
            </div>
        </div>
        <div class="corporate-image"></div>
    </div>
</div>


<div class="my-div"></div>

<!-- js -->
<script src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/main.js' ?>"></script>
<script src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/philosophy.js' ?>"></script>
<script type="module" src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/fluid_animation.js' ?>"></script>
<script src="<?php echo get_stylesheet_directory_uri() . '/_g3/assets/js/slideshow.js' ?>"></script>