'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeTechCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.2, 18.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Root Group for interactive rotation
    const rootGroup = new THREE.Group();
    rootGroup.scale.set(0.90, 0.90, 0.90);
    scene.add(rootGroup);

    // Brand Colors
    const COLOR_PURPLE = 0x7B1B5A;
    const COLOR_GOLDEN = 0xE9A51A;
    const COLOR_GREY = 0xA6A4A5;
    const COLOR_DARK = 0x181018;
    const COLOR_SCREEN_BG = 0x12030d;
    const COLOR_EMISSIVE_PURPLE = 0x4a0a33;
    const COLOR_CYBER_GOLD = 0xffba26;

    // Shared Materials
    const chassisDarkMaterial = new THREE.MeshStandardMaterial({
      color: 0x221a24,
      roughness: 0.35,
      metalness: 0.75,
    });

    const chassisGoldMaterial = new THREE.MeshStandardMaterial({
      color: COLOR_GOLDEN,
      roughness: 0.25,
      metalness: 0.85,
    });

    const chassisPurpleMaterial = new THREE.MeshStandardMaterial({
      color: COLOR_PURPLE,
      roughness: 0.3,
      metalness: 0.6,
    });

    const silverMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8d6d8,
      roughness: 0.2,
      metalness: 0.9,
    });

    const screenGlowMaterial = new THREE.MeshStandardMaterial({
      color: COLOR_SCREEN_BG,
      emissive: COLOR_PURPLE,
      emissiveIntensity: 0.65,
      roughness: 0.2,
      metalness: 0.1,
    });

    const screenGoldGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1202,
      emissive: COLOR_CYBER_GOLD,
      emissiveIntensity: 0.45,
      roughness: 0.2,
    });

    // Helper: Create a glowing canvas texture for screens
    function createCodeScreenTexture(title: string, subtitle: string, accentColor: string) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 320;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Background gradient
        const grad = ctx.createLinearGradient(0, 0, 512, 320);
        grad.addColorStop(0, '#15030f');
        grad.addColorStop(1, '#080106');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 320);

        // Header bar
        ctx.fillStyle = '#2a0a20';
        ctx.fillRect(0, 0, 512, 40);

        // Window buttons
        ctx.fillStyle = '#E9A51A';
        ctx.beginPath();
        ctx.arc(20, 20, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#c44a8a';
        ctx.beginPath();
        ctx.arc(38, 20, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#A6A4A5';
        ctx.beginPath();
        ctx.arc(56, 20, 6, 0, Math.PI * 2);
        ctx.fill();

        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(title, 80, 26);

        // Screen Content (Holographic IT diagnostic lines)
        ctx.fillStyle = accentColor;
        ctx.font = '14px monospace';
        ctx.fillText('> COMTECH CHIP-LEVEL DIAGNOSTICS: ACTIVE', 24, 75);
        ctx.fillText('> BGA / SMT LOGIC REPAIR ... OK', 24, 105);
        ctx.fillText('> 4K HIKVISION COLORVU STREAMS: 16 CH', 24, 135);
        ctx.fillText('> TALLY PRIME CLOUD SYNC: 100% SYNCHRONIZED', 24, 165);

        // Simulated graphs / pulse
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(24, 240);
        ctx.lineTo(80, 240);
        ctx.lineTo(110, 200);
        ctx.lineTo(140, 260);
        ctx.lineTo(180, 220);
        ctx.lineTo(220, 240);
        ctx.lineTo(320, 240);
        ctx.lineTo(360, 190);
        ctx.lineTo(400, 250);
        ctx.lineTo(480, 240);
        ctx.stroke();

        ctx.fillStyle = '#E9A51A';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(subtitle, 24, 290);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    }

    // =========================================================================
    // 1. 3D LAPTOP (Center-Left Hero Item)
    // =========================================================================
    const laptopGroup = new THREE.Group();

    // Base Keyboard Chassis
    const laptopBaseGeo = new THREE.BoxGeometry(3.6, 0.16, 2.5);
    const laptopBase = new THREE.Mesh(laptopBaseGeo, chassisDarkMaterial);
    laptopGroup.add(laptopBase);

    // Keyboard Bed
    const keyboardGeo = new THREE.BoxGeometry(3.2, 0.04, 1.4);
    const keyboardMat = new THREE.MeshStandardMaterial({ color: 0x140a12, roughness: 0.6 });
    const keyboard = new THREE.Mesh(keyboardGeo, keyboardMat);
    keyboard.position.set(0, 0.09, -0.25);
    laptopGroup.add(keyboard);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(1.1, 0.02, 0.7);
    const trackpadMat = new THREE.MeshStandardMaterial({ color: 0x33202e, metalness: 0.4 });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, 0.09, 0.75);
    laptopGroup.add(trackpad);

    // Gold Accent Trim on laptop edge
    const laptopTrimGeo = new THREE.BoxGeometry(3.64, 0.06, 0.06);
    const laptopTrim = new THREE.Mesh(laptopTrimGeo, chassisGoldMaterial);
    laptopTrim.position.set(0, 0.04, 1.25);
    laptopGroup.add(laptopTrim);

    // Screen Lid (Rotated back 115 degrees)
    const screenLidGroup = new THREE.Group();
    screenLidGroup.position.set(0, 0.08, -1.25);

    const lidGeo = new THREE.BoxGeometry(3.6, 2.4, 0.12);
    const lidMesh = new THREE.Mesh(lidGeo, chassisDarkMaterial);
    lidMesh.position.set(0, 1.2, 0);
    screenLidGroup.add(lidMesh);

    // Glowing Display Panel
    const laptopTexture = createCodeScreenTexture('COMTECH LAPTOP OS', 'SURI MOTHERBOARD LAB - 98.4% SUCCESS', '#E9A51A');
    const screenGeo = new THREE.PlaneGeometry(3.3, 2.1);
    const screenMat = new THREE.MeshBasicMaterial({ map: laptopTexture });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.2, 0.065);
    screenLidGroup.add(screenMesh);

    // Laptop Logo on Lid back
    const lidLogoGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 16);
    lidLogoGeo.rotateX(Math.PI / 2);
    const lidLogo = new THREE.Mesh(lidLogoGeo, chassisGoldMaterial);
    lidLogo.position.set(0, 1.2, -0.065);
    screenLidGroup.add(lidLogo);

    screenLidGroup.rotation.x = -Math.PI * 0.18; // Tilted open
    laptopGroup.add(screenLidGroup);

    laptopGroup.position.set(-2.8, -0.5, 1.0);
    laptopGroup.rotation.set(0.35, 0.55, -0.15);
    rootGroup.add(laptopGroup);

    // =========================================================================
    // 2. 3D DESKTOP ALL-IN-ONE / MONITOR + PC TOWER (Center-Right Depth)
    // =========================================================================
    const desktopGroup = new THREE.Group();

    // Ultra-Slim Monitor Frame
    const monitorFrameGeo = new THREE.BoxGeometry(4.2, 2.6, 0.14);
    const monitorFrame = new THREE.Mesh(monitorFrameGeo, chassisDarkMaterial);
    desktopGroup.add(monitorFrame);

    // Monitor Glowing Display
    const monitorTexture = createCodeScreenTexture('COMTECH ENTERPRISE SERVER', 'CCTV COLORVU 16-CAM ARRAY ACTIVE', '#c44a8a');
    const monitorScreenGeo = new THREE.PlaneGeometry(3.9, 2.3);
    const monitorScreenMat = new THREE.MeshBasicMaterial({ map: monitorTexture });
    const monitorScreen = new THREE.Mesh(monitorScreenGeo, monitorScreenMat);
    monitorScreen.position.set(0, 0, 0.075);
    desktopGroup.add(monitorScreen);

    // Monitor Stand
    const standStemGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.8, 16);
    const standStem = new THREE.Mesh(standStemGeo, silverMetalMaterial);
    standStem.position.set(0, -1.8, -0.2);
    standStem.rotation.x = -0.1;
    desktopGroup.add(standStem);

    const standBaseGeo = new THREE.BoxGeometry(1.6, 0.08, 1.2);
    const standBase = new THREE.Mesh(standBaseGeo, chassisPurpleMaterial);
    standBase.position.set(0, -2.6, -0.1);
    desktopGroup.add(standBase);

    // Mini Desktop PC Tower beside Monitor
    const towerGeo = new THREE.BoxGeometry(1.1, 2.8, 2.0);
    const tower = new THREE.Mesh(towerGeo, chassisDarkMaterial);
    tower.position.set(3.0, -1.2, -0.5);
    desktopGroup.add(tower);

    // Tower Glowing RGB Fan / Front LED Strip
    const towerLedGeo = new THREE.BoxGeometry(0.08, 2.4, 0.08);
    const towerLedMat = new THREE.MeshBasicMaterial({ color: COLOR_GOLDEN });
    const towerLed = new THREE.Mesh(towerLedGeo, towerLedMat);
    towerLed.position.set(3.0, -1.2, 0.52);
    desktopGroup.add(towerLed);

    const fanRingGeo = new THREE.TorusGeometry(0.35, 0.04, 12, 24);
    const fanRingMat = new THREE.MeshBasicMaterial({ color: COLOR_PURPLE });
    const fanRing = new THREE.Mesh(fanRingGeo, fanRingMat);
    fanRing.position.set(3.0, -0.6, 0.52);
    desktopGroup.add(fanRing);

    desktopGroup.position.set(2.4, 1.0, -1.5);
    desktopGroup.rotation.set(0.15, -0.4, 0.05);
    rootGroup.add(desktopGroup);

    // =========================================================================
    // 3. 3D MULTI-FUNCTION LASER PRINTER (Bottom-Right)
    // =========================================================================
    const printerGroup = new THREE.Group();

    // Main Printer Chassis
    const printerBodyGeo = new THREE.BoxGeometry(2.8, 1.5, 2.2);
    const printerBody = new THREE.Mesh(printerBodyGeo, chassisDarkMaterial);
    printerGroup.add(printerBody);

    // Top Scanner Glass Lid
    const scannerLidGeo = new THREE.BoxGeometry(2.82, 0.2, 2.22);
    const scannerLid = new THREE.Mesh(scannerLidGeo, chassisPurpleMaterial);
    scannerLid.position.set(0, 0.8, 0);
    printerGroup.add(scannerLid);

    // Front Output Paper Tray
    const outputTrayGeo = new THREE.BoxGeometry(1.8, 0.08, 1.0);
    const outputTray = new THREE.Mesh(outputTrayGeo, silverMetalMaterial);
    outputTray.position.set(0, -0.2, 1.35);
    outputTray.rotation.x = 0.15;
    printerGroup.add(outputTray);

    // Paper Sheet Emerging
    const paperGeo = new THREE.PlaneGeometry(1.4, 1.1);
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      side: THREE.DoubleSide,
    });
    const paper = new THREE.Mesh(paperGeo, paperMat);
    paper.position.set(0, -0.15, 1.45);
    paper.rotation.x = -Math.PI / 2 + 0.15;
    printerGroup.add(paper);

    // Control Panel Screen with Glowing LED
    const printerPanelGeo = new THREE.BoxGeometry(0.9, 0.5, 0.06);
    const printerPanelMat = new THREE.MeshBasicMaterial({ color: 0x24081c });
    const printerPanel = new THREE.Mesh(printerPanelGeo, printerPanelMat);
    printerPanel.position.set(0.8, 0.35, 1.12);
    printerPanel.rotation.x = -0.25;
    printerGroup.add(printerPanel);

    const ledDotGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const ledDotMat = new THREE.MeshBasicMaterial({ color: COLOR_GOLDEN });
    const ledDot = new THREE.Mesh(ledDotGeo, ledDotMat);
    ledDot.position.set(1.1, 0.45, 1.14);
    printerGroup.add(ledDot);

    printerGroup.position.set(3.2, -3.2, 0.5);
    printerGroup.rotation.set(0.3, -0.35, 0.1);
    rootGroup.add(printerGroup);

    // =========================================================================
    // 4. 3D SMARTPHONE / MOBILE DEVICE (Top-Left)
    // =========================================================================
    const phoneGroup = new THREE.Group();

    // Phone Body
    const phoneBodyGeo = new THREE.BoxGeometry(1.3, 2.6, 0.12);
    const phoneBody = new THREE.Mesh(phoneBodyGeo, chassisDarkMaterial);
    phoneGroup.add(phoneBody);

    // Gold Outer Bumper Edge
    const phoneFrameGeo = new THREE.BoxGeometry(1.34, 2.64, 0.08);
    const phoneFrame = new THREE.Mesh(phoneFrameGeo, chassisGoldMaterial);
    phoneGroup.add(phoneFrame);

    // Glowing Mobile App Screen
    const phoneScreenGeo = new THREE.PlaneGeometry(1.2, 2.45);
    const phoneScreenTexture = createCodeScreenTexture('COMTECH MOBILE APP', 'CCTV LIVE STREAM + TALLY CLOUD', '#E9A51A');
    const phoneScreenMat = new THREE.MeshBasicMaterial({ map: phoneScreenTexture });
    const phoneScreen = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreen.position.set(0, 0, 0.065);
    phoneGroup.add(phoneScreen);

    // Camera Lens module on back
    const cameraIslandGeo = new THREE.BoxGeometry(0.45, 0.45, 0.06);
    const cameraIsland = new THREE.Mesh(cameraIslandGeo, chassisPurpleMaterial);
    cameraIsland.position.set(-0.35, 0.95, -0.07);
    phoneGroup.add(cameraIsland);

    const lensGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.04, 16);
    lensGeo.rotateX(Math.PI / 2);
    const lensMat = new THREE.MeshBasicMaterial({ color: COLOR_GOLDEN });
    const lens1 = new THREE.Mesh(lensGeo, lensMat);
    lens1.position.set(-0.35, 1.05, -0.09);
    phoneGroup.add(lens1);
    const lens2 = new THREE.Mesh(lensGeo, lensMat);
    lens2.position.set(-0.35, 0.85, -0.09);
    phoneGroup.add(lens2);

    phoneGroup.position.set(-4.2, 2.6, -0.5);
    phoneGroup.rotation.set(-0.25, 0.45, -0.2);
    rootGroup.add(phoneGroup);

    // =========================================================================
    // 5. 3D CCTV SURVEILLANCE CAMERA (Top-Right Hero Item)
    // =========================================================================
    const cctvGroup = new THREE.Group();

    // Bullet Camera Main Barrel
    const cctvBodyGeo = new THREE.CylinderGeometry(0.55, 0.65, 1.8, 24);
    cctvBodyGeo.rotateZ(Math.PI / 2);
    const cctvBody = new THREE.Mesh(cctvBodyGeo, chassisDarkMaterial);
    cctvGroup.add(cctvBody);

    // Sun Shield Visor
    const visorGeo = new THREE.CylinderGeometry(0.68, 0.72, 1.4, 24, 1, false, 0, Math.PI);
    visorGeo.rotateZ(Math.PI / 2);
    visorGeo.rotateX(-Math.PI / 2);
    const visor = new THREE.Mesh(visorGeo, chassisPurpleMaterial);
    visor.position.set(0.2, 0.15, 0);
    cctvGroup.add(visor);

    // Optical Lens Core with Glowing Infrared Ring
    const cctvFrontCapGeo = new THREE.CylinderGeometry(0.54, 0.54, 0.1, 24);
    cctvFrontCapGeo.rotateZ(Math.PI / 2);
    const cctvFrontCap = new THREE.Mesh(cctvFrontCapGeo, chassisDarkMaterial);
    cctvFrontCap.position.set(0.92, 0, 0);
    cctvGroup.add(cctvFrontCap);

    const cctvLensGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const cctvLensMat = new THREE.MeshStandardMaterial({
      color: 0x050508,
      roughness: 0.1,
      metalness: 0.9,
    });
    const cctvLens = new THREE.Mesh(cctvLensGeo, cctvLensMat);
    cctvLens.position.set(0.96, 0, 0);
    cctvGroup.add(cctvLens);

    const irRingGeo = new THREE.TorusGeometry(0.38, 0.03, 12, 24);
    irRingGeo.rotateY(Math.PI / 2);
    const irRingMat = new THREE.MeshBasicMaterial({ color: COLOR_GOLDEN });
    const irRing = new THREE.Mesh(irRingGeo, irRingMat);
    irRing.position.set(0.95, 0, 0);
    cctvGroup.add(irRing);

    // Mounting Bracket
    const mountArmGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 12);
    const mountArm = new THREE.Mesh(mountArmGeo, silverMetalMaterial);
    mountArm.position.set(-0.7, -0.6, 0);
    mountArm.rotation.z = -Math.PI / 4;
    cctvGroup.add(mountArm);

    const wallPlateGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.08, 16);
    wallPlateGeo.rotateZ(Math.PI / 2);
    const wallPlate = new THREE.Mesh(wallPlateGeo, chassisPurpleMaterial);
    wallPlate.position.set(-1.1, -1.0, 0);
    cctvGroup.add(wallPlate);

    cctvGroup.position.set(4.0, 3.2, 0.5);
    cctvGroup.rotation.set(-0.3, -0.6, 0.2);
    rootGroup.add(cctvGroup);

    // =========================================================================
    // 6. 3D MOTHERBOARD CPU CHIP / PROCESSOR (Bottom-Left)
    // =========================================================================
    const chipGroup = new THREE.Group();

    // Green/Purple PCB Substrate
    const pcbGeo = new THREE.BoxGeometry(2.0, 0.08, 2.0);
    const pcb = new THREE.Mesh(pcbGeo, chassisPurpleMaterial);
    chipGroup.add(pcb);

    // Gold Contact Edge Pins
    const goldPinsGeo = new THREE.BoxGeometry(2.04, 0.04, 2.04);
    const goldPins = new THREE.Mesh(goldPinsGeo, chassisGoldMaterial);
    chipGroup.add(goldPins);

    // Integrated Heat Spreader (IHS) Metal Lid
    const ihsGeo = new THREE.BoxGeometry(1.4, 0.16, 1.4);
    const ihs = new THREE.Mesh(ihsGeo, silverMetalMaterial);
    ihs.position.set(0, 0.1, 0);
    chipGroup.add(ihs);

    // Glowing Die Center / Logo
    const dieGeo = new THREE.BoxGeometry(0.7, 0.04, 0.7);
    const dieMat = new THREE.MeshBasicMaterial({ color: COLOR_GOLDEN });
    const die = new THREE.Mesh(dieGeo, dieMat);
    die.position.set(0, 0.2, 0);
    chipGroup.add(die);

    // Holographic Orbital Rings around Chip
    const chipRingGeo = new THREE.TorusGeometry(1.6, 0.02, 8, 32);
    const chipRingMat = new THREE.MeshBasicMaterial({ color: COLOR_PURPLE, transparent: true, opacity: 0.7 });
    const chipRing = new THREE.Mesh(chipRingGeo, chipRingMat);
    chipRing.rotation.x = Math.PI / 3;
    chipGroup.add(chipRing);

    chipGroup.position.set(-3.5, -3.0, -0.8);
    chipGroup.rotation.set(0.6, 0.4, -0.3);
    rootGroup.add(chipGroup);

    // =========================================================================
    // 7. GLOWING NETWORK INTERCONNECT DATA LINES (Connecting the IT items)
    // =========================================================================
    const curvePoints = [
      new THREE.Vector3(-2.8, -0.5, 1.0), // Laptop
      new THREE.Vector3(-4.2, 2.6, -0.5),  // Phone
      new THREE.Vector3(4.0, 3.2, 0.5),    // CCTV
      new THREE.Vector3(2.4, 1.0, -1.5),   // Desktop
      new THREE.Vector3(3.2, -3.2, 0.5),   // Printer
      new THREE.Vector3(-3.5, -3.0, -0.8), // Chip
      new THREE.Vector3(-2.8, -0.5, 1.0), // Back to Laptop
    ];

    const curve = new THREE.CatmullRomCurve3(curvePoints, true);
    const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.025, 8, true);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: COLOR_GOLDEN,
      transparent: true,
      opacity: 0.4,
    });
    const networkTube = new THREE.Mesh(tubeGeo, tubeMat);
    rootGroup.add(networkTube);

    // Second overlapping network ring
    const ringTorusGeo = new THREE.TorusGeometry(6.8, 0.03, 12, 64);
    const ringTorusMat = new THREE.MeshBasicMaterial({
      color: COLOR_PURPLE,
      transparent: true,
      opacity: 0.55,
    });
    const ringTorus = new THREE.Mesh(ringTorusGeo, ringTorusMat);
    ringTorus.rotation.x = Math.PI / 4;
    ringTorus.rotation.y = Math.PI / 6;
    rootGroup.add(ringTorus);

    // =========================================================================
    // 8. FLOATING CYBER DATA PARTICLES
    // =========================================================================
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 4.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      const rnd = Math.random();
      if (rnd > 0.55) {
        // Golden
        colors[i] = 0.914;
        colors[i + 1] = 0.647;
        colors[i + 2] = 0.102;
      } else if (rnd > 0.25) {
        // Purple
        colors[i] = 0.482;
        colors[i + 1] = 0.106;
        colors[i + 2] = 0.353;
      } else {
        // Silver Grey
        colors[i] = 0.651;
        colors[i + 1] = 0.643;
        colors[i + 2] = 0.647;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particleSystem);

    // =========================================================================
    // 9. LIGHTING SETUP
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xfff5fa, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(8, 12, 10);
    scene.add(dirLight1);

    const pointLightGolden = new THREE.PointLight(COLOR_GOLDEN, 3.5, 40);
    pointLightGolden.position.set(-6, 6, 8);
    scene.add(pointLightGolden);

    const pointLightPurple = new THREE.PointLight(COLOR_PURPLE, 4.0, 40);
    pointLightPurple.position.set(6, -6, 8);
    scene.add(pointLightPurple);

    // =========================================================================
    // 10. MOUSE INTERACTIVITY & ANIMATION LOOP
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate entire hardware constellation
      rootGroup.rotation.y = t * 0.12 + targetX * 0.5;
      rootGroup.rotation.x = Math.sin(t * 0.15) * 0.08 + targetY * 0.35;

      // 1. Laptop floating wave
      laptopGroup.position.y = -0.5 + Math.sin(t * 1.4) * 0.25;
      laptopGroup.rotation.z = -0.15 + Math.cos(t * 1.1) * 0.05;

      // 2. Desktop monitor floating wave
      desktopGroup.position.y = 1.0 + Math.cos(t * 1.2) * 0.22;
      desktopGroup.rotation.y = -0.4 + Math.sin(t * 0.8) * 0.06;

      // 3. Printer floating wave
      printerGroup.position.y = -3.2 + Math.sin(t * 1.0 + 1.0) * 0.2;
      printerGroup.rotation.z = 0.1 + Math.cos(t * 0.9) * 0.04;

      // 4. Smartphone floating & tilt
      phoneGroup.position.y = 2.6 + Math.sin(t * 1.6 + 2.0) * 0.3;
      phoneGroup.rotation.y = 0.45 + Math.cos(t * 1.3) * 0.12;

      // 5. CCTV Camera scanning motion
      cctvGroup.position.y = 3.2 + Math.cos(t * 1.1 + 0.5) * 0.22;
      cctvGroup.rotation.y = -0.6 + Math.sin(t * 1.5) * 0.2; // Scanning sweep

      // 6. Microchip rotating
      chipGroup.position.y = -3.0 + Math.sin(t * 1.3 + 3.0) * 0.25;
      chipGroup.rotation.y = 0.4 + t * 0.4;
      chipRing.rotation.z = t * 0.8;

      // Particle field counter-rotation
      particleSystem.rotation.y = -t * 0.06;
      ringTorus.rotation.z = t * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] pointer-events-auto cursor-grab active:cursor-grabbing relative"
    />
  );
}
