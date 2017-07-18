# vi: set ft=ruby:

class VM
  attr_accessor :hostname, :box, :cpus, :memory, :provisioner
  def initialize(options ={})
    self.hostname = options[:hostname]
    self.box = options[:box] || 'ubuntu/xenial64'
    self.cpus = options[:cpus] || '1'
    self.memory = options[:memory] || '512'
    #self.provisioner = options[:provisioner] || "./#{options[:hostname]}/#{options[:hostname]}_config.sh"
  end
end

nodes  = [
  VM.new(hostname: 'site'), # option to use specific path with provisioner: path/to/file
  VM.new(hostname: 'data')
]

Vagrant.configure("2") do |config|
  nodes.each do |node|
    config.vm.define node.hostname do |node_config|
      node_config.vm.box = node.box
      node_config.vm.hostname = node.hostname
      node_config.vm.network :public_network
      node_config.vm.synced_folder ".", "/vagrant", disabled: true
      node_config.vm.provider :virtualbox do |vbox|
        vbox.name = node.hostname
        vbox.memory = node.memory
        vbox.cpus = node.cpus
      end
      #node_config.vm.provision "shell", path: node.provisioner
    end
  end
end
