'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeOrbit() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const resetRef = useRef(null);
  const startAnimationRef = useRef(null);
  const pausedRef = useRef(false);
  const fallbackDragRef = useRef({ dragging: false, x: 0, y: 0, lastX: 0, lastY: 0 });
  const [fallback, setFallback] = useState(false);
  const [paused, setPaused] = useState(false);
  const [fallbackKey, setFallbackKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext('webgl2', {
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    if (!context) {
      setFallback(true);
      return;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      setFallback(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const root = new THREE.Group();
    scene.add(root);
    scene.add(new THREE.AmbientLight(0xffffff, 1.7));

    const keyLight = new THREE.PointLight(0xc5ff9c, 32, 12);
    keyLight.position.set(-2.5, 2.8, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x35b76a, 24, 10);
    rimLight.position.set(2, -2.2, -1);
    scene.add(rimLight);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.83, 48, 48),
      new THREE.MeshPhysicalMaterial({
        color: 0x123b25,
        metalness: 0.42,
        roughness: 0.28,
        clearcoat: 0.8,
        clearcoatRoughness: 0.18,
      }),
    );
    root.add(core);

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.39, 2),
      new THREE.MeshStandardMaterial({
        color: 0xa3ed77,
        emissive: 0x3b9a4a,
        emissiveIntensity: 0.8,
        metalness: 0.22,
        roughness: 0.22,
        flatShading: true,
      }),
    );
    root.add(inner);

    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(0.96, 24, 16),
      new THREE.MeshBasicMaterial({ color: 0xb7f497, wireframe: true, transparent: true, opacity: 0.17 }),
    );
    root.add(wire);

    const orbits = [];
    const orbitSpecs = [
      { radius: 1.38, tilt: 0.58, speed: 0.22, color: 0x9fe870, size: 0.11 },
      { radius: 1.7, tilt: -0.76, speed: -0.15, color: 0xf4f8e9, size: 0.075 },
      { radius: 2.03, tilt: 1.1, speed: 0.11, color: 0x56bf77, size: 0.065 },
    ];

    orbitSpecs.forEach(({ radius, tilt, speed, color, size }, index) => {
      const orbit = new THREE.Group();
      orbit.rotation.x = tilt;
      orbit.rotation.y = index * 0.72;
      root.add(orbit);

      const line = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.006, 6, 160),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: index === 0 ? 0.52 : 0.25 }),
      );
      orbit.add(line);

      const satellite = new THREE.Mesh(
        new THREE.SphereGeometry(size, 20, 20),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.5,
          metalness: 0.15,
          roughness: 0.25,
        }),
      );
      satellite.position.set(radius, 0, 0);
      orbit.add(satellite);
      orbits.push({ orbit, speed });
    });

    const particles = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i += 1) {
      const angle = (i / 150) * Math.PI * 2;
      const radius = 2.3 + (((i * 37) % 100) / 100) * 0.65;
      particles[i * 3] = Math.cos(angle) * radius;
      particles[i * 3 + 1] = Math.sin(angle * 1.7) * 1.1;
      particles[i * 3 + 2] = Math.sin(angle) * radius * 0.4;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    const particleField = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0x5e945a, size: 0.018, transparent: true, opacity: 0.6, sizeAttenuation: true }),
    );
    scene.add(particleField);

    let frameId;
    let elapsed = 0;
    let pointerX = 0;
    let pointerY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    });
    resizeObserver.observe(container);

    const onPointerDown = (event) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      container.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event) => {
      if (dragging) {
        pointerX = THREE.MathUtils.clamp(pointerX + (event.clientX - lastX) * 0.008, -0.65, 0.65);
        pointerY = THREE.MathUtils.clamp(pointerY + (event.clientY - lastY) * 0.008, -0.5, 0.5);
      } else {
        const rect = container.getBoundingClientRect();
        pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.34;
        pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.24;
      }
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const onPointerUp = (event) => {
      dragging = false;
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
    };
    const onPointerLeave = () => {
      if (!dragging) {
        pointerX = 0;
        pointerY = 0;
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);
    container.addEventListener('pointerleave', onPointerLeave);

    const animate = () => {
      if (pausedRef.current) {
        renderer.render(scene, camera);
        return;
      }
      frameId = window.requestAnimationFrame(animate);
      elapsed += 0.008;
      root.rotation.y += (pointerX - root.rotation.y) * 0.025;
      root.rotation.x += (pointerY + Math.sin(elapsed * 0.32) * 0.025 - root.rotation.x) * 0.025;
      inner.rotation.x += 0.002;
      inner.rotation.y -= 0.003;
      wire.rotation.y -= 0.001;
      orbits.forEach(({ orbit, speed }) => {
        orbit.rotation.z += speed * 0.008;
      });
      particleField.rotation.y -= 0.0005;
      renderer.render(scene, camera);
    };

    const startAnimation = () => {
      window.cancelAnimationFrame(frameId);
      if (pausedRef.current) {
        renderer.render(scene, camera);
      } else {
        frameId = window.requestAnimationFrame(animate);
      }
    };
    startAnimationRef.current = startAnimation;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionPreferenceChange = () => {
      pausedRef.current = motionQuery.matches;
      setPaused(motionQuery.matches);
      startAnimation();
    };

    pausedRef.current = motionQuery.matches;
    setPaused(motionQuery.matches);
    resetRef.current = () => {
      pointerX = 0;
      pointerY = 0;
      elapsed = 0;
      root.rotation.set(0, 0, 0);
      inner.rotation.set(0, 0, 0);
      wire.rotation.set(0, 0, 0);
      orbits.forEach(({ orbit }, index) => {
        orbit.rotation.set(orbitSpecs[index].tilt, index * 0.72, 0);
      });
      renderer.render(scene, camera);
    };
    startAnimation();
    motionQuery.addEventListener('change', onMotionPreferenceChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      resetRef.current = null;
      startAnimationRef.current = null;
      motionQuery.removeEventListener('change', onMotionPreferenceChange);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      container.removeEventListener('pointerleave', onPointerLeave);
      resizeObserver.disconnect();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
    };
  }, []);

  const toggleMotion = () => {
    const nextPaused = !pausedRef.current;
    pausedRef.current = nextPaused;
    setPaused(nextPaused);
    startAnimationRef.current?.();
  };

  const handlePointerDown = (event) => {
    if (!fallback) return;
    const drag = fallbackDragRef.current;
    drag.dragging = true;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!fallback) return;
    const drag = fallbackDragRef.current;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (drag.dragging) {
      drag.x = THREE.MathUtils.clamp(drag.x + (event.clientX - drag.lastX) * 0.28, -18, 18);
      drag.y = THREE.MathUtils.clamp(drag.y + (event.clientY - drag.lastY) * -0.28, -18, 18);
    } else {
      drag.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
      drag.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -12;
    }
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    event.currentTarget.style.setProperty('--scene-tilt-x', `${drag.x}deg`);
    event.currentTarget.style.setProperty('--scene-tilt-y', `${drag.y}deg`);
  };

  const handlePointerUp = (event) => {
    const drag = fallbackDragRef.current;
    drag.dragging = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handlePointerLeave = (event) => {
    const drag = fallbackDragRef.current;
    if (drag.dragging) return;
    drag.x = 0;
    drag.y = 0;
    event.currentTarget.style.setProperty('--scene-tilt-x', '0deg');
    event.currentTarget.style.setProperty('--scene-tilt-y', '0deg');
  };

  const resetScene = () => {
    resetRef.current?.();
    const drag = fallbackDragRef.current;
    drag.dragging = false;
    drag.x = 0;
    drag.y = 0;
    containerRef.current?.style.setProperty('--scene-tilt-x', '0deg');
    containerRef.current?.style.setProperty('--scene-tilt-y', '0deg');
    setFallbackKey((key) => key + 1);
  };

  return (
    <div className="hero__visual">
      <div
        className={`hero__scene${fallback ? ' hero__scene--fallback' : ''}${paused ? ' hero__scene--paused' : ''}`}
        ref={containerRef}
        role="img"
        aria-label="Interactive three-dimensional orbital scene. Drag to rotate the model."
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        <canvas className="hero__canvas" ref={canvasRef} aria-hidden="true" />
        {fallback && (
          <div className="hero__fallback" key={fallbackKey} aria-hidden="true">
            <span className="hero__fallback-orbit hero__fallback-orbit--one" />
            <span className="hero__fallback-orbit hero__fallback-orbit--two" />
            <span className="hero__fallback-orbit hero__fallback-orbit--three" />
            <span className="hero__fallback-core" />
          </div>
        )}
        <span className="hero__scene-label hero__scene-label--one" aria-hidden="true">BUILD</span>
        <span className="hero__scene-label hero__scene-label--two" aria-hidden="true">CONNECT</span>
        <span className="hero__scene-label hero__scene-label--three" aria-hidden="true">DELIVER</span>
      </div>
      <div className="hero__controls">
        <span className="hero__hint">Drag the scene to explore</span>
        <div className="hero__control-actions">
          <button type="button" onClick={toggleMotion} aria-pressed={paused}>
            {paused ? 'Resume motion' : 'Pause motion'}
          </button>
          <button type="button" onClick={resetScene}>Reset view</button>
        </div>
      </div>
    </div>
  );
}
